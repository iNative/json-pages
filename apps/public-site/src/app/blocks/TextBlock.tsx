import React from 'react';
import { TextBlockData, BlockSettings } from '@json-pages/shared-data';
// 👇 IMPORT UTILITY SICUREZZA
import { sanitizeHtml } from '../utils/security';

interface Props {
  data: TextBlockData;
  settings?: BlockSettings;
}

export const TextBlock: React.FC<Props> = ({ data, settings }) => {
  // 🔒 SANITIZZAZIONE PREVENTIVA
  // Puliamo l'HTML prima ancora che venga passato al rendering
  const safeContent = sanitizeHtml(data.content);

  return (
    <section 
      className={settings?.cssClass}
      style={{
        backgroundColor: settings?.backgroundColor,
        paddingTop: settings?.paddingTop || '3rem',
        paddingBottom: settings?.paddingBottom || '3rem'
      }}
    >
      <div className={settings?.container === 'fluid' ? 'container-fluid' : 'container'}>
        {data.title && <h2 className="mb-4 font-weight-bold">{data.title}</h2>}
        
        {/* Renderizziamo l'HTML pulito */}
        <div 
          className="content-body"
          dangerouslySetInnerHTML={{ __html: safeContent }} 
        />
      </div>
    </section>
  );
};