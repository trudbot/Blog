import { CSSProperties, onMounted, Ref, shallowRef, watch, watchEffect } from 'vue';
import Close from '@/assets/macos/close.png'
import Minimize from '@/assets/macos/minimize.png'
import Maximize from '@/assets/macos/maximize.png'

export enum BtnState {
  NOT_ACTIVE,
  HOVER_NORMAL,
  NOT_HOVER_NORMAL,
  Hover_FUll_SCREEN,
  NOT_HOVER_FULL_SCREEN
}

export enum BtnType {
  CLOSE= 'btn-close',
  MINIMIZE = 'btn-minimize',
  MAXIMIZE = 'btn-maximize'
}

const btn = [
  {
    class: BtnType.CLOSE,
  },
  {
    class: BtnType.MINIMIZE,
  },
  {
    class: BtnType.MAXIMIZE,
  }
]

const normalBtnStyle: CSSProperties[] = [
  {
    backgroundColor: '#ff5f56'
  },
  {
    backgroundColor: '#ffbd2e'
  },
  {
    backgroundColor: '#27c93f'
  }
]

const hoverBtnStyle: CSSProperties[] = [
  {
    backgroundImage: `url(${Close})`,
  },
  {
    backgroundImage: `url(${Minimize})`,
  },
  {
    backgroundImage: `url(${Maximize})`,
  }
]

const notActiveBtnStyle: CSSProperties[] = [
  {
    backgroundColor: '#d5d0ce'
  },
  {
    backgroundColor: '#d5d0ce'
  },
  {
    backgroundColor: '#d5d0ce'
  }
]

const normalBtn = btn.map((item, index) => {
  return {
    ...item,
    style: normalBtnStyle[index]
  }
})

const hoverBtn = btn.map((item, index) => {
  return {
    ...item,
    style: hoverBtnStyle[index]
  }
})

const notActiveBtn = btn.map((item, index) => {
  return {
    ...item,
    style: notActiveBtnStyle[index]
  }
})

export const buttons = [
  {
    key: BtnState.NOT_HOVER_NORMAL,
    info: normalBtn
  },
  {
    key: BtnState.HOVER_NORMAL,
    info: hoverBtn
  },
  {
    key: BtnState.NOT_ACTIVE,
    info: notActiveBtn
  }
]

export const useMacOsBtnState = (
  btnGroup: Ref<HTMLElement | undefined>,
  active: Ref<boolean>,
  {
    close,
    minimize,
    maximize
  }: {
    close?: () => void,
    minimize?: () => void,
    maximize?: () => void
  } = {}
) => {
  const btnStyle = shallowRef<BtnState>(BtnState.NOT_ACTIVE);

  watchEffect(() => {
    if (active.value) {
      btnStyle.value = BtnState.NOT_HOVER_NORMAL;
    } else {
      btnStyle.value = BtnState.NOT_ACTIVE;
    }
  });

  watchEffect(() => {
    btnGroup.value?.addEventListener('mouseenter', () => {
      btnStyle.value = BtnState.HOVER_NORMAL;
    });
    btnGroup.value?.addEventListener('mouseleave', () => {
      btnStyle.value = active.value ? BtnState.NOT_HOVER_NORMAL : BtnState.NOT_ACTIVE;
    });
    btnGroup.value?.addEventListener('mousedown', e => e.stopPropagation());
    btnGroup.value?.addEventListener('click', e => {
      const src = e.target as HTMLElement;
      const classes = src.classList;
      if (classes.contains(BtnType.CLOSE)) {
        close && close();
      } else if (classes.contains(BtnType.MINIMIZE)) {
        minimize && minimize();
      } else if (classes.contains(BtnType.MAXIMIZE)) {
        maximize && maximize();
      }
    });
  });
  return {btnStyle};
}