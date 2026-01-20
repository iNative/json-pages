import React from 'react';
import { TextBlockData, BlockSettings } from '@json-pages/shared-data';

interface Props {
  data: TextBlockData;
  settings?: BlockSettings;
}

export const TextBlock: React.FC<Props> = ({ data, settings }) => {
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
        
        {/* Renderizziamo l'HTML in modo sicuro (React richiede dangerouslySetInnerHTML) */}
        <div 
          className="content-body"
          dangerouslySetInnerHTML={{ __html: data.content }} 
        />
      </div>
    </section>
  );
};