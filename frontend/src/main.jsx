import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ConfigProvider } from 'antd'
import App from './App.jsx'
import './index.css'

const theme = {
  token: {
    colorPrimary: '#c2530a',
    colorSuccess: '#3d6b2c',
    colorWarning: '#f59e0b',
    colorInfo: '#c2530a',
    colorBgBase: '#faf6f0',
    colorTextBase: '#2c1810',
    borderRadius: 10,
    fontFamily: "'Inter', sans-serif",
    fontSize: 14,
    colorLink: '#c2530a',
    colorLinkHover: '#a8420a',
    controlHeight: 40,
  },
  components: {
    Button: {
      borderRadius: 10,
      fontWeight: 600,
    },
    Card: {
      borderRadiusLG: 16,
    },
    Menu: {
      itemColor: '#6b4c3b',
      itemHoverColor: '#c2530a',
      itemSelectedColor: '#c2530a',
      horizontalItemSelectedColor: '#c2530a',
      horizontalItemHoverColor: '#c2530a',
      activeBarBorderWidth: 2,
    },
    Input: {
      activeBorderColor: '#c2530a',
      hoverBorderColor: '#e06b1a',
    },
    Slider: {
      trackBg: '#c2530a',
      trackHoverBg: '#e06b1a',
      handleColor: '#c2530a',
      handleActiveColor: '#a8420a',
      dotActiveBorderColor: '#c2530a',
    },
    Rate: {
      starColor: '#f59e0b',
      starSize: 14,
    },
    Pagination: {
      itemActiveBg: '#c2530a',
      colorPrimary: '#c2530a',
    },
    Tag: {
      borderRadiusSM: 12,
    },
    Steps: {
      colorPrimary: '#c2530a',
    },
  },
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ConfigProvider theme={theme}>
      <App />
    </ConfigProvider>
  </StrictMode>,
)
