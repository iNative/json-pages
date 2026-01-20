import { TenantProvider } from './context/TenantContext';
import { ConfigProvider } from './context/ConfigContext'; // 👈 Nuovo
import { Shell } from './Shell';

export function App() {
  return (
    <TenantProvider>
      <ConfigProvider> {/* 👈 Avvolgi la Shell */}
        <Shell />
      </ConfigProvider>
    </TenantProvider>
  );
}

export default App;