---
title: 初尝Web Component
lastUpdated: '2024-07-19 16:34:03'
date: '2024-07-11 21:22:04'
---
Web Component 是 2017年前新出的一套标准, 旨在提供官方的视图 组件化解决方案。

现在让我们从视图组件化必不可少的组成部分上， 介绍web component。

## 封装——Custom Element

wc使用自定义html标签/元素的方式来封装组件视图。

具体的， 我们可以定义一个继承自`HTMLElement`的自定义dom类型， 然后使用`window.customElements.define`进行全局注册， 随后就能在html中使用这个自定义标签。

例.

```js
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <script>
    class MyComponent extends HTMLElement {
      constructor() {
        super();
      }
  
      connectedCallback() {
        const el = document.createElement('h1');
        el.textContent = 'Hello World';
        this.append(el);
      }
    }
    customElements.define('my-component', MyComponent);
  </script>
</head>
<body>
  <my-component>
    <h2>abc</h2>
  </my-component>
</body>
</html>
```

![截屏2024-07-12 下午5.20.11](https://trudbot-md-img.oss-cn-shanghai.aliyuncs.com/202407121757676.png)

### 标签的生命周期

在上面的例子中你可能已经注意到了， 我在`connectedCallback`进行了dom操作, 它是自定义标签的生命周期， 执行于元素被挂载到dom树上时。

这是因为custom element的constructor行为是受限的， 标准规定不允许在constructor中进行dom内容修改。 custom element的constructor的一些规定如下:

1. constructor必须首先执行无参的父构造函数调用: `super()`
2. constructor中不能出现`return`语句， 除非是空返回或者`return this`
3. constructor中不能使用`document.write`或`document.open`
4. constructor中不能访问和设置 当前元素的attributes或者子元素

以上内容详见[HTML 标准 (whatwg.org)](https://html.spec.whatwg.org/multipage/custom-elements.html#custom-element-conformance)

一般来说,  自定义元素的初始化逻辑会放到`connectedCallback`钩子中执行, 而constructor中主要进行一些初始属性和默认值的设置， 以及绑定事件监听和`attachShadow`

---

自定义元素生命周期回调包括：

- `connectedCallback()`：每当元素添加到文档中时调用。规范建议开发人员尽可能在此回调中实现自定义元素的设定，而不是在构造函数中实现。
- `disconnectedCallback()`：每当元素从文档中移除时调用。
- `adoptedCallback()`：每当元素被移动到新文档中时调用。
- [`attributeChangedCallback()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Web_components/Using_custom_elements#响应属性变化)：在属性更改、添加、移除或替换时调用。

### 标签的数据通信

在视图组件中， 常常会有数据通信的场景: 

1. 使用组件时， 为组件提供某些数据， 且在后期可以更改
2. 由用户触发的时机(如 click等)， 组件需要发送一个事件给父组件

#### 父 --> 子

我们很容易想到,  目前已经有`Attribute` 或 `data-*`这一为标签提供数据的方法了,  我们只需要通过`getAttribute`方法就能拿到为标签提供的数据。

同时为了有效地使用属性，元素必须能够响应属性值的变化。为此官方提供了属性变化回调的实现。

1. 一个名为 `observedAttributes` 的静态属性。这必须是一个包含元素需要变更通知的所有属性名称的数组。
2. `attributeChangedCallback()` 生命周期回调的实现。

`attributeChangedCallback()` 回调在列在元素的 `observedAttributes` 属性中的属性被添加、修改、移除或替换时调用。

回调接受三个参数：

- 发生变化的属性的名称。
- 属性的旧值。
- 属性的新值。

以下是一个例子: 

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <script>
    class PriceText extends HTMLElement {
      // 监听price属性值的变化
      static observedAttributes = ["price"];
      constructor() {
        super();
      }

      calcColor() {
        const price = this.getAttribute('price');
        if (price === null || price === "") return;
        // 判断price是正、0、负
        const priceValue = parseFloat(price);
        let color = 'black';
        if (!isNaN(priceValue)) {
          if (priceValue > 0) {
            color = 'green'; // 涨-颜色
          } else if (priceValue < 0) {
            color = 'red'; // 跌-颜色
          }
        }
        this.style.color = color;
        this.textContent = priceValue.toFixed(2); // 格式化显示价格
      }
  
      connectedCallback() {
        this.calcColor();
      }

      attributeChangedCallback(name, oldValue, newValue) {
        if (name == 'price') {
          this.calcColor();
        }
      }
    }
    customElements.define('price-text', PriceText);
  </script>
</head>
<body>
  <price-text price="300"></price-text>
  <price-text price="0"></price-text>
  <price-text price="-300"></price-text>
</body>
</html>
```

![截屏2024-07-12 下午6.24.01](https://trudbot-md-img.oss-cn-shanghai.aliyuncs.com/202407121824303.png)

`price-text`组件在初始化以及`price`属性变化时， 都会根据price值重新计算颜色。

需要注意的是， 仅这个例子而言， 在`connectedCallback`中计算颜色并不是必要的，因为price属性的初始设置一样会触发`attributeChangedCallback`回调。

---

attribute由于html的限制只能传递文本数据， 这意味着若用它传递复杂的js数据， 则每次都需要反序列化。所以attribute只适合传递一些简单的文本、数值数据。

对于复杂的数据， 可以考虑在DOM类上自定义设置属性的方法。

#### 子 --> 父

显然我们可以通过事件机制来向上层发送消息。

除了默认的事件外， 还可以使用[自定义事件](https://developer.mozilla.org/zh-CN/docs/Web/API/CustomEvent)来自己定义消息类别和消息的数据格式。

以下是一个通过自定义事件向上层发送数据的单选组件示例:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <style>
    .ratio-selector {
      display: flex;
      flex-direction: row;
      font-size: 18px;
    }

    .ratio-option {
      padding: 12px 19px;
      border: 1px solid #ccc;
    }

    .ratio-option:not(:last-child) {
      border-right: none;
    }

    .ratio-option.selected {
      background-color: rgb(0, 150, 94);
      color: white;
    }
  </style>
  <script>
    // 单选组件
    class RatioSelector extends HTMLElement {
      static observedAttributes = ["options"];
      options = [];
      selectedIndex = 0;
      constructor(options) {
        super();
        this.options = options || [];
        this.addEventListener('click', this.handleClick);
      }

      render() {
        this.innerHTML = '';
        this.selectedIndex = 0;
        this.append(...this.options.map(
          (option, index) => this.createOptionElement(option, index === this.selectedIndex)
        ));
      }

      updateSelectedIndex(index) {
        this.selectedIndex = index;
        Array.from(this.children).forEach((optionElement, i) => {
          if (i === index) {
            optionElement.classList.add('selected');
          } else {
            optionElement.classList.remove('selected');
          }
        });
      }

      handleClick(e) {
        const optionElement = e.target;
        if (optionElement.classList.contains('ratio-option')) {
          const index = Array.from(this.children).indexOf(optionElement);
          // 更新选择的元素
          this.updateSelectedIndex(index);
          // 向上层发送事件
          this.dispatchChangeEvent();
        }
      }

      createOptionElement(option, selected = false) {
        const optionElement = document.createElement('div');
        optionElement.classList.add('ratio-option');
        selected && optionElement.classList.add('selected');
        optionElement.textContent = option;
        return optionElement;
      }

      dispatchChangeEvent() {
        this.dispatchEvent(new CustomEvent('selected-change', {
          detail: {
            index: this.selectedIndex,
            value: this.options[this.selectedIndex]
          },
          bubbles: true,
          cancelable: false
        }));
      }

      connectedCallback() {
        this.classList.add('ratio-selector');
        this.render();
      }

      attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'options') {
          newValue = JSON.parse(newValue);
          if (Array.isArray(newValue)) {
            this.options = newValue.map(option => option.toString());
          } else {
            this.options = [];
          }
          this.render();
        }
      }
    };
    customElements.define('ratio-selector', RatioSelector);
  </script>
</head>
<body>
  <ratio-selector options="[1, 2, 3, 4, 5]" class="select"></ratio-selector>
  <hr/>
  <p class="selected-text"></p>
  <script>
    const selector = document.querySelector('.select');
    const selectedText = document.querySelector('.selected-text');
    selector.addEventListener('selected-change', (e) => {
      selectedText.textContent = `当前选择的是：${e.detail.value}`;
    });
  </script>
</body>
</html>
```



![截屏2024-07-12 下午7.35.05](https://trudbot-md-img.oss-cn-shanghai.aliyuncs.com/202407121935140.png)

## 上下文隔离——Shadow DOM

Custom Element提供了一个封装的方式,  但仅仅是形式上的封装是不够的， 我们还需要保证封装在不同场景下都是可用的、不会轻易被破坏的。比如组件外 css或者dom查询时用的选择器选中了组件内的元素，  这有可能是符合预期的， 但更大概率是不符合的。

所以， 提供一个隔离的能力， 让开发者显式地选择是否影响组件内的环境， 是非常有必要的。

![显示文档、影子根和影子宿主交互的图示的 SVG 版本。](https://trudbot-md-img.oss-cn-shanghai.aliyuncs.com/202407122002368.svg)

- **影子宿主（Shadow host）**: 影子 DOM 附加到的常规 DOM 节点。
- **影子树（Shadow tree）**: 影子 DOM 内部的 DOM 树。
- **影子边界（Shadow boundary）**: 影子 DOM 终止，常规 DOM 开始的地方。
- **影子根（Shadow root）**: 影子树的根节点。

> 在影子 DOM 向 web 开发者提供之前，浏览器已经使用它来封装元素的内部结构。以 [``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/video) 元素举例，它暴露了默认浏览器控件。在 DOM 中你只能看到 `<video>` 元素，但其影子 DOM 中包含了一系列按钮和其它控件。影子 DOM 规范使你能够操纵自定义元素的影子 DOM。



使用`Element.attachShadow()`将一个shadow root挂载到到当前元素,  然后返回shadow root。

在shadow dom中增删dom元素和平时完全相同， 只是操作对象从原element变成了shadow root。

这是一个简单的使用shadow dom的示例:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <script>
    class MyComponent extends HTMLElement {
      constructor() {
        super();
      }
  
      connectedCallback() {
        this.shadow = this.attachShadow({mode: 'closed'});
        const el = document.createElement('p');
        el.textContent = '在shadow dom中的元素';
        const style = document.createElement('style');
        style.textContent = 'p { font-size: 32px; }';
        this.shadow.append(el, style);
      }
    }
    customElements.define('my-component', MyComponent);
  </script>
  <style>
    p {
      color: red;
    }
  </style>
</head>
<body>
  <my-component></my-component>
  <p>不在shadow dom中的元素</p>
</body>
</html>
```

![截屏2024-07-12 下午8.18.38](https://trudbot-md-img.oss-cn-shanghai.aliyuncs.com/202407122058952.png)

我们可以发现, shadow dom外部的样式无法影响shadow dom内部; shadow dom内部的样式也无法影响外部。

而`attachShadow()`的`mode`选项控制是否将shadow tree向组件外部暴露。

* mode为closed时， shadow root只会通过`attachShadow()`函数返回
* mode为`open`时， shadow root会保存在`Element.shadowRoot`只读属性中， 外部可以使用javascript通过`Element.shadowRoot`操作shadow tree.

### web component 引入外部CSS

隔离是封装不可或缺的一部分， 但隔离的同时， 也会存在需要复用css的场景。

* 比如， 大部分前端项目都会有`reset.css`的全局样式， 对html自带的一些样式进行清除.但使用了shadow dom的情况下， `reset.css`无法影响`shadow dom`, 在每个shadow dom内再写一份? 
* 比如， 你封装了一个wc组件， 你希望给用户一定的css定制能力

我们接下来讨论， 将shadow dom外部的样式引入内部的具体方法。

#### 组件数据流

1. 可以使用attribute实现组件外部向组件内部传递css样式数据， 再有组件内部通过js进行设置
2. 组件内部可以向外部暴露设置css的接口甚至是shadow root实例，让外部修改css样式

#### 网络导入

假设要引入的css以文件为单位， 我们便可以引入网络导入， 在实现复用的同时， 不增加代码体积。

index.css:

```css
p {
  color: red;
}
```

##### css 导入

@import 语法允许在css中导入网络文件。

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <script>
    class MyComponent extends HTMLElement {
      constructor() {
        super();
      }
  
      connectedCallback() {
        this.shadow = this.attachShadow({mode: 'closed'});
        const el = document.createElement('p');
        el.textContent = '在shadow dom中的元素';
        const style = document.createElement('style');
        style.textContent = '@import "./index.css";';
        this.shadow.append(el, style);
      }
    }
    customElements.define('my-component', MyComponent);
  </script>
  <link rel="stylesheet" href="./index.css">
</head>
<body>
  <my-component></my-component>
  <p>不在shadow dom中的元素</p>
</body>
</html>
```

##### js导入

js导入的原理是， 将css通过网络导入为文本， 再通过js为shadow dom设置样式。

js用css文本为dom设置样式一般有两种做法。

1. 将css文本包裹在`<style>`标签中， 将其挂载到页面

```js
connectedCallback() {
  ...
  fetch('./index.css').then(res => res.text()).then(data => {
    const style = document.createElement('style');
    style.textContent = data;
    this.shadow.append(style);
  });
}
```

2. 将文本转换为样式表对象， 将其接入shadow dom中

```js
connectedCallback() {
  ...
  fetch('./index.css').then(res => res.text()).then(data => {
    const stylesheet = new CSSStyleSheet();
    stylesheet.replaceSync(data);
    this.shadow.adoptedStyleSheets = [stylesheet];
  });
}
```

#### css变量穿透

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <script type="module">
    class MyComponent extends HTMLElement {
      constructor() {
        super();
      }
  
      connectedCallback() {
        this.shadow = this.attachShadow({mode: 'closed'});
        const el = document.createElement('p');
        el.textContent = '在shadow dom中的元素';
        const style = document.createElement('style');
        style.textContent = 'p { color: var(--p-color); }';
        this.shadow.append(el, style);
      }
    }
    customElements.define('my-component', MyComponent);
  </script>
  <style>
    html { --p-color: red; }
    p { color: blue; }
  </style>
</head>
<body>
  <my-component class="component"></my-component>
  <p>不在shadow dom中的元素</p>
</body>
</html>
```

![截屏2024-07-12 下午9.52.36](https://trudbot-md-img.oss-cn-shanghai.aliyuncs.com/202407122152417.png)如上所示， css变量仍然被正常继承， 不会被shadow dom隔离。

#### part伪元素

part是专为shadow dom设计的伪元素， 作用是在某自定义标签的shadow tree中匹配含有指定`part`属性值的元素

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <script type="module">
    class MyComponent extends HTMLElement {
      constructor() {
        super();
      }
  
      connectedCallback() {
        this.shadow = this.attachShadow({mode: 'closed'});
        const el = document.createElement('p');
        el.textContent = '在shadow dom中的元素';
        el.setAttribute('part', 'text');
        this.shadow.append(el);
      }
    }
    customElements.define('my-component', MyComponent);
  </script>
  <style>
    my-component::part(text) { color: red; }
    p { color: blue; }
  </style>
</head>
<body>
  <my-component class="component"></my-component>
  <p>不在shadow dom中的元素</p>
</body>
</html>
```



![截屏2024-07-12 下午10.02.08](https://trudbot-md-img.oss-cn-shanghai.aliyuncs.com/202407122202662.png)

## 模板复用——<template\>

`template`标签是一个用来存储html片段的标签， <template\>标签包括其内容都不会被渲染, 但你可以通过js引用`template`元素， 使用`content`属性拿到template标签中的内容。

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <template class="tpl">
    <h1>hello template!</h1>
    <h2>template中的内容</h2>
  </template>
  <div class="div1" style="color: red"></div>
  <div class="div2" style="color: blue;"></div>

  <script>
    // 获取template元素
    const tpl = document.querySelector('.tpl');
    // 获取template元素的内容
    const tplContent = tpl.content;
    const div1 = document.querySelector('.div1');
    const div2 = document.querySelector('.div2');
    div1.appendChild(tplContent.cloneNode(true));
    div2.appendChild(tplContent.cloneNode(true));
  </script>
</body>
</html>
```

注意， 当需要多次使用template内容时， 需要使用cloneNode复制一份。 

> `<template>` 元素的内容存在于其 `content` 属性中，这是一个 `DocumentFragment`。这个 `DocumentFragment` 可以包含任意数量的节点，且不会直接在页面上渲染。
>
> 当直接将DocumentFragment append到其他dom元素上时, 会插入片段的所有子节点，并留下一个空的 `DocumentFragment`。

### 在组件化中template的优势何在

你可能会有这样的疑问, 使用组件时我们往往都会写一套组件的html模板， 但不使用template也照样可以完成。 比如createElement根结点然后设置`innerHTML`； 比如说手动去生成每一个dom节点。 那么使用template的优势是什么呢?

1. 更好的语义

正如其标签名

2. html与js分离

template可以直接预先放在html文件中， js中无需再在客户端进行重复的dom生成。

3. 更好的性能

模板内容在页面加载时不会被立即解析和渲染，只有在实际使用时（例如克隆并插入到文档中）才会被解析。从已有的fragment中复制过来也比js重复创建性能要好。

4. template相比于常规元素的优势

比如template中可以直接放`<td>`元素，与之对比的`<td>`放到div中将直接消失。

类似这种有父元素要求的标签， 在template中都能正常解析。

## 插槽——<slot\>

在有些情况下, 我们希望组件内的一部分html结构能由使用者自定义, 这便是插槽的用武之地了。

通过以下这个例子我们来了解slot的用法:

```html
<!--自定义标签 my-button 的模板-->
<template id="MyButtonTpl">
  <style>
    .beautiful-button {
      padding: 10px 20px;
      border: none;
      border-radius: 5px;
      background-image: linear-gradient(to right, #ff7e5f, #feb47b);
      color: white;
      font-size: 16px;
      cursor: pointer;
      outline: none;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      transition: all 0.3s ease;
    }
    .beautiful-button:hover {
      background-image: linear-gradient(to right, #feb47b, #ff7e5f);
      box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
      transform: translateY(-2px);
    }
    .beautiful-button:active {
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
      transform: translateY(1px);
    }
  </style>
  <!--使用slot声明一个占位的插槽, name用于标记一个插槽-->
  <button class="beautiful-button">
    to <slot name="text"></slot>
  </button>
</template>

<!--使用slot属性-->
<my-button url="https://www.google.com">
  <span slot="text">google</span>
</my-button>

<script>
  class MyButton extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
      const template = document.getElementById('MyButtonTpl');
      const content = template.content.cloneNode(true);

      const button = content.querySelector('.beautiful-button');
      const url = this.getAttribute('url');
      const text = this.getAttribute('text');

      button.addEventListener('click', () => {
        window.location.href = url;
      });
      this.shadowRoot.appendChild(content);
    }
  }
  window.customElements.define('my-button', MyButton);
</script>
```

![截屏2024-07-19 下午4.14.11](https://trudbot-md-img.oss-cn-shanghai.aliyuncs.com/202407191614200.png)

在自定义标签的dom树中， 可以使用`slot`元素声明占位插槽元素。

当自定义标签使用了shadow dom时， 放置的子元素将不会被显示; 除非通过插槽， 通过插槽放置的子元素能被shadow tree引用在插槽指定的位置。

插槽在被命名和未被命名时行为有所不同。

* 具名插槽: 指具有name属性的`slot`元素， 可以通过将标签子元素的slot属性设置为slot的name来插入对应的插槽
* 未命名插槽: 一个自定义标签中只能存储一个有效的未命名插槽(存在多个时只有第一个会有效); 自定义标签所有的未指定`slot`属性的子元素都会插入未命名插槽中， 包括文本元素， 比如这个例子:

```html
<!--自定义标签的html模板-->
<template> 
		<button class="beautiful-button">
      to <slot name="text"></slot> bc <slot></slot>
    </button>
 </template>

<!--使用自定义标签-->
<my-button url="https://www.google.com">
  bcd
  <span slot="text">google</span>
  abc
</my-button>
```

它的渲染结果是

![截屏2024-07-19 下午4.31.15](https://trudbot-md-img.oss-cn-shanghai.aliyuncs.com/202407191631696.png)

## 参考

[使用影子 DOM - Web API | MDN (mozilla.org)](https://developer.mozilla.org/zh-CN/docs/Web/API/Web_components/Using_shadow_DOM#在影子_dom_内应用样式)

[javascript - 【Web components】Web Components中引入外部CSS的 8 种方法 - 个人文章 - SegmentFault 思否](https://segmentfault.com/a/1190000040915602?_ea=179939174#item-5)

[javascript - 【Web components】浅析Web components的痛点 - 个人文章 - SegmentFault 思否](https://segmentfault.com/a/1190000040943517#item-5)

[DocumentFragment - Web API | MDN (mozilla.org)](https://developer.mozilla.org/zh-CN/docs/Web/API/DocumentFragment)
