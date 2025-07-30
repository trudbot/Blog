<script setup lang="ts">
import { JsonFormatView } from '@trudbot/json-format';
import { ref } from 'vue';

const iv = ref('{"text":"abc"}');
</script>

<template>
    <div class="json-format-lab">
        <div class="json-input">
            <h3>JSON 输入</h3>
            <textarea v-model="iv" placeholder="请输入 JSON 数据..."></textarea>
        </div>
        <div class="json-format-view">
            <h3>格式化视图</h3>
            <JsonFormatView :value="iv"/>
        </div>
    </div>
</template>

<style>
@import '@trudbot/json-format/style';

.json-format-lab {
  width: 100%;
  height: calc(100vh - var(--vp-nav-height));
  display: flex;
  gap: 24px;
  padding: 24px;
  box-sizing: border-box;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg, rgba(255,255,255,0.1) 25%, transparent 25%), 
                linear-gradient(-45deg, rgba(255,255,255,0.1) 25%, transparent 25%), 
                linear-gradient(45deg, transparent 75%, rgba(255,255,255,0.1) 75%), 
                linear-gradient(-45deg, transparent 75%, rgba(255,255,255,0.1) 75%);
    background-size: 20px 20px;
    background-position: 0 0, 0 10px, 10px -10px, -10px 0px;
    opacity: 0.3;
    pointer-events: none;
  }

  .json-input {
    flex: 1;
    display: flex;
    flex-direction: column;
    position: relative;
    z-index: 1;
    
    h3 {
      margin: 0 0 16px 0;
      color: #333;
      font-size: 18px;
      font-weight: 700;
      text-shadow: 0 2px 4px rgba(0,0,0,0.3);
      display: flex;
      align-items: center;
      gap: 8px;
      
      &::before {
        content: '📝';
        font-size: 20px;
      }
    }
    
    textarea {
      flex: 1;
      width: 100%;
      min-height: 300px;
      padding: 20px;
      border: none;
      border-radius: 16px;
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(10px);
      color: #2d3748;
      font-family: 'Fira Code', 'Monaco', 'Consolas', monospace;
      font-size: 14px;
      line-height: 1.6;
      resize: none;
      outline: none;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      box-sizing: border-box;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1),
                  inset 0 1px 0 rgba(255, 255, 255, 0.8);
      
      &:focus {
        transform: translateY(-2px);
        box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15),
                    inset 0 1px 0 rgba(255, 255, 255, 0.8),
                    0 0 0 3px rgba(102, 126, 234, 0.3);
        background: rgba(255, 255, 255, 1);
      }
      
      &::placeholder {
        color: #a0aec0;
        font-style: italic;
      }
      
      &:hover {
        transform: translateY(-1px);
        box-shadow: 0 10px 36px rgba(0, 0, 0, 0.12),
                    inset 0 1px 0 rgba(255, 255, 255, 0.8);
      }
    }
  }

  .json-format-view {
    flex: 1;
    display: flex;
    flex-direction: column;
    position: relative;
    z-index: 1;
    
    h3 {
      margin: 0 0 16px 0;
      color: #333;
      font-size: 18px;
      font-weight: 700;
      text-shadow: 0 2px 4px rgba(0,0,0,0.3);
      display: flex;
      align-items: center;
      gap: 8px;
      
      &::before {
        content: '✨';
        font-size: 20px;
      }
    }
    
    > div {
      flex: 1;
      border: none;
      border-radius: 16px;
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(10px);
      padding: 20px;
      overflow: auto;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1),
                  inset 0 1px 0 rgba(255, 255, 255, 0.8);
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      
      &:hover {
        transform: translateY(-1px);
        box-shadow: 0 10px 36px rgba(0, 0, 0, 0.12),
                    inset 0 1px 0 rgba(255, 255, 255, 0.8);
      }
    }
  }
  
  /* 响应式设计 */
  @media (max-width: 768px) {
    flex-direction: column;
    padding: 16px;
    gap: 20px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    
    .json-input, .json-format-view {
      h3 {
        font-size: 16px;
        
        &::before {
          font-size: 18px;
        }
      }
    }
    
    .json-input textarea {
      min-height: 250px;
      padding: 16px;
    }
    
    .json-format-view > div {
      padding: 16px;
    }
  }
  
  /* 深色模式适配 */
  @media (prefers-color-scheme: dark) {
    background: linear-gradient(135deg, #1a365d 0%, #553c9a 100%);
    
    .json-input textarea,
    .json-format-view > div {
      background: rgba(26, 32, 44, 0.95);
      color: #e2e8f0;
      
      &:focus, &:hover {
        background: rgba(26, 32, 44, 1);
      }
    }
    
    .json-input textarea::placeholder {
      color: #718096;
    }
  }
}

</style>