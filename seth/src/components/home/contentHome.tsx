import React from 'react';

interface ContentProps {
  sections: { id: number; content: string | JSX.Element }[];
  activeSections: number[];
  className?: string;
}

const Content: React.FC<ContentProps> = ({ sections, activeSections, className }) => {
  return (
      <div className={className}>
        {sections.map(
          (section) =>
            activeSections.includes(section.id) && (
              <div key={section.id} className="section">
                <p>{section.content}</p>
              </div>
          )
      )}
      </div>
  );
};

export default Content;
