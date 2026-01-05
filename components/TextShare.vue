<template>
    <div class="text-share-container">
        <div class="card">
            <!-- Header -->
            <div class="header">
                <h2 class="title">
                    {{ isReceiverMode ? '📦 收到分享内容' : '🔗 文本/链接分享' }}
                </h2>
                <button v-if="isReceiverMode" class="btn-text" @click="reset">
                    ← 返回生成
                </button>
            </div>

            <!-- Receiver Mode -->
            <div v-if="isReceiverMode" class="content-section fade-in">
                <div class="result-box">
                    <!-- Use pre-wrap to preserve whitespace -->
                    <div class="text-content">{{ receivedContent }}</div>
                </div>
                <div class="actions">
                    <button 
                        class="btn primary" 
                        :class="{ success: copied }"
                        @click="handleCopy(receivedContent)"
                    >
                        {{ copied ? '✅ 已复制' : '复制内容' }}
                    </button>
                    <button class="btn outline" @click="openInNewTab" v-if="isUrl(receivedContent)">
                        打开链接
                    </button>
                </div>
            </div>

            <!-- Generator Mode -->
            <div v-else class="generator-section fade-in">
                <div class="input-wrapper">
                    <textarea
                        v-model="inputText"
                        class="input-area"
                        placeholder="在此输入要分享的文本或长链接..."
                        rows="5"
                    ></textarea>
                    <div class="char-count" :class="{ 'text-warning': inputText.length > 1000 }">
                        {{ inputText.length }} 字符
                    </div>
                </div>

                <div v-if="inputText" class="preview-section">
                    <div class="qr-card">
                        <qrcode-vue
                            :value="shareUrl"
                            :size="qrSize"
                            level="L"
                            render-as="svg"
                            class="qrcode"
                        />
                        <p class="hint">手机扫码查看</p>
                    </div>
          
                    <div class="link-actions">
                        <button 
                            class="btn outline full-width" 
                            :class="{ success: copied }"
                            @click="handleCopy(shareUrl)"
                        >
                            {{ copied ? '✅ 链接已复制' : '复制分享链接' }}
                        </button>
                    </div>
                </div>
        
                <div v-else class="empty-state">
                    <p>输入内容后自动生成二维码</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import QrcodeVue from 'qrcode.vue';
import { useClipboard, useWindowSize } from '@vueuse/core';

// --- State ---
const inputText = ref('');
const isReceiverMode = ref(false);
const receivedContent = ref('');
const currentOrigin = ref('');

// --- Composables ---
const { copy, copied } = useClipboard({ legacy: true });
const { width } = useWindowSize();

// --- Computed ---
const qrSize = computed(() => {
  const len = inputText.value.length;
  // Base size logic: larger content = denser QR = needs more pixels to be scannable
  let size = 200;
  if (len > 800) size = 320;
  else if (len > 400) size = 280;
  else if (len > 150) size = 240;
  
  // Responsive constraint: ensure it fits on mobile screens
  // Subtract padding (approx 40-60px)
  const maxScreenSize = Math.min(width.value - 60, 400);
  
  return Math.min(size, maxScreenSize);
});

const shareUrl = computed(() => {
  if (!inputText.value) return '';
  // Use hash to avoid server-side length limits (414 URI Too Long)
  // Hash fragments are not sent to the server
  return `${currentOrigin.value}#share=${encodeURIComponent(inputText.value)}`;
});

// --- Methods ---
const handleCopy = (text: string) => {
  copy(text);
};

const isUrl = (text: string) => {
  try {
    new URL(text);
    return true;
  } catch {
    return false;
  }
};

const openInNewTab = () => {
  if (isUrl(receivedContent.value)) {
    window.open(receivedContent.value, '_blank');
  }
};

const reset = () => {
  isReceiverMode.value = false;
  receivedContent.value = '';
  inputText.value = '';
  // Clear hash without reloading page
  if (typeof window !== 'undefined') {
    history.pushState("", document.title, window.location.pathname + window.location.search);
  }
};

const checkHash = () => {
  if (typeof window === 'undefined') return;
  
  const hash = window.location.hash;
  if (hash.startsWith('#share=')) {
    try {
      const content = decodeURIComponent(hash.substring(7)); // '#share='.length is 7
      if (content) {
        receivedContent.value = content;
        isReceiverMode.value = true;
      }
    } catch (e) {
      console.error('Failed to decode content', e);
    }
  }
};

// --- Lifecycle ---
onMounted(() => {
  currentOrigin.value = window.location.origin + window.location.pathname;
  checkHash();
  
  // Listen for hash changes (e.g. if user clicks back button)
  window.addEventListener('hashchange', checkHash);
});

</script>

<style scoped lang="scss">
.text-share-container {
  width: 100%;
  max-width: 960px; /* 宽屏适配：增加最大宽度，避免在 2k 屏上过窄，同时保持阅读舒适度 */
  margin: 0 auto;
  padding: 40px 0;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  box-sizing: border-box;
}

.card {
  /* 去除卡片样式，融入整体页面 */
  background: transparent;
  border: none;
  box-shadow: none;
  border-radius: 0;
  width: 100%;
  max-width: 100%;
  display: flex;
  flex-direction: column;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 0 20px 0; /* 移除内边距，改为下边距 */
  border-bottom: 1px solid var(--vp-c-divider, #eee); /* 保留分割线，区分标题 */
  background: transparent;
  
  .title {
    margin: 0;
    font-size: 1.5rem; /* 加大标题字号 */
    font-weight: 600;
    color: var(--vp-c-text-1, #333);
  }
}

.btn-text {
  background: none;
  border: none;
  color: var(--vp-c-brand, #3451b2);
  cursor: pointer;
  font-size: 1rem;
  padding: 8px 12px;
  border-radius: 4px;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: var(--vp-c-bg-mute, #f5f5f5);
  }
}

.content-section, .generator-section {
  padding: 30px 0; /* 移除左右内边距，增加上下间距 */
}

.input-wrapper {
  position: relative;
  margin-bottom: 30px;
}

.input-area {
  width: 100%;
  padding: 16px;
  border: 1px solid var(--vp-c-divider, #ddd);
  border-radius: 8px;
  font-size: 1.1rem; /* 加大输入字号 */
  line-height: 1.6;
  resize: vertical;
  min-height: 200px; /* 增加默认高度 */
  background-color: var(--vp-c-bg-alt, #f8f9fa); /* 轻微背景色区分输入区 */
  color: var(--vp-c-text-1, #333);
  transition: all 0.2s;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: var(--vp-c-brand, #3451b2);
    background-color: var(--vp-c-bg, #fff);
    box-shadow: 0 0 0 2px rgba(52, 81, 178, 0.1);
  }
}

.char-count {
  text-align: right;
  font-size: 0.9rem;
  color: var(--vp-c-text-2, #666);
  margin-top: 8px;
  
  &.text-warning {
    color: #e6a23c;
  }
}

.preview-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  animation: slideUp 0.3s ease-out;
  padding-top: 20px;
  border-top: 1px dashed var(--vp-c-divider, #eee);
}

.qr-card {
  /* 二维码保持卡片样式以突出显示 */
  background: white;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.06);
  border: 1px solid #eee;
  display: flex;
  flex-direction: column;
  align-items: center;
  
  .hint {
    margin: 12px 0 0;
    font-size: 0.9rem;
    color: #666;
  }
}

.result-box {
  background: var(--vp-c-bg-alt, #f8f9fa);
  padding: 24px;
  border-radius: 8px;
  border: 1px solid var(--vp-c-divider, #eee);
  margin-bottom: 30px;
  max-height: 60vh; /* 增加最大高度 */
  overflow-y: auto;
  
  .text-content {
    white-space: pre-wrap;
    word-break: break-all;
    color: var(--vp-c-text-1, #333);
    font-size: 1.1rem;
    line-height: 1.8;
  }
}

.actions, .link-actions {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  justify-content: flex-start; /* 左对齐按钮 */
}

.btn {
  flex: 0 1 auto; /* 按钮不再强制撑满 */
  min-width: 160px; /* 保证最小宽度 */
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  
  &.primary {
    background-color: var(--vp-c-brand, #3451b2);
    color: white;
    border: none;
    
    &:hover {
      background-color: var(--vp-c-brand-dark, #2a408e);
      transform: translateY(-1px);
    }
    
    &:active {
      transform: translateY(0);
    }
  }
  
  &.outline {
    background-color: transparent;
    border: 1px solid var(--vp-c-divider, #ddd);
    color: var(--vp-c-text-1, #333);
    
    &:hover {
      border-color: var(--vp-c-brand, #3451b2);
      color: var(--vp-c-brand, #3451b2);
      background-color: var(--vp-c-bg-mute, #f9f9f9);
    }
  }
  
  &.success {
    background-color: #10b981;
    border-color: #10b981;
    color: white;
  }

  &.full-width {
    width: 100%;
  }
}

.empty-state {
  text-align: center;
  color: var(--vp-c-text-3, #999);
  padding: 60px 0;
  font-style: italic;
  font-size: 1.1rem;
}

@keyframes slideUp {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.fade-in {
  animation: fadeIn 0.3s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* Mobile Optimization */
@media (max-width: 600px) {
  .text-share-container {
    padding: 47px 20px 20px 20px; /* 保持顶部 47px 间距 */
  }

  .header {
    padding: 0 0 16px 0;
    position: static; /* 移动端不再需要 sticky，因为整体布局变了 */
  }
  
  .content-section, .generator-section {
    padding: 20px 0;
  }
  
  .actions, .link-actions {
    flex-direction: column;
  }
  
  .btn {
    width: 100%;
    flex: 1;
  }
}
</style>