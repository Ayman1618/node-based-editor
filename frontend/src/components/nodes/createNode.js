import { useState, useMemo } from 'react';
import { BaseNode, NodeTextField, NodeSelectField, NodeTextareaField } from './BaseNode';

// Factory function that creates node components from declarative configuration
export const createNode = (config) => {
  const {
    title,
    fields = [],
    handles = [],
    style = {},
    getInitialData = (id, data) => ({}),
    customContent = null,
  } = config;

  return ({ id, data }) => {
    const initialData = getInitialData(id, data);
    
    const fieldStates = {};
    fields.forEach(field => {
      const defaultValue = typeof field.defaultValue === 'function' 
        ? field.defaultValue(id) 
        : field.defaultValue;
      
      const [value, setValue] = useState(
        data?.[field.key] || initialData[field.key] || defaultValue || ''
      );
      fieldStates[field.key] = { value, setValue };
    });

    const generatedHandles = useMemo(() => {
      return handles.map(handle => ({
        ...handle,
        id: handle.id || `${id}-${handle.name || handle.type}`,
      }));
    }, [id]);

    if (customContent) {
      return customContent({ id, data, fieldStates, generatedHandles, title, style });
    }

    const renderFields = () => {
      return fields.map((field, index) => {
        const { value, setValue } = fieldStates[field.key];
        const handleChange = (e) => {
          if (field.transform) {
            const newValue = field.transform(e.target.value);
            if (newValue !== undefined) {
              setValue(newValue);
            }
          } else {
            setValue(e.target.value);
          }
        };

        switch (field.type) {
          case 'text':
            return (
              <NodeTextField
                key={field.key}
                label={field.label}
                value={value}
                onChange={handleChange}
                placeholder={field.placeholder}
                style={field.style}
              />
            );
          
          case 'select':
            return (
              <NodeSelectField
                key={field.key}
                label={field.label}
                value={value}
                onChange={handleChange}
                options={field.options}
                style={field.style}
              />
            );
          
          case 'textarea':
            return (
              <NodeTextareaField
                key={field.key}
                label={field.label}
                value={value}
                onChange={handleChange}
                placeholder={field.placeholder}
                rows={field.rows}
                style={field.style}
              />
            );
          
          default:
            return null;
        }
      });
    };

    return (
      <BaseNode
        id={id}
        data={data}
        title={title}
        handles={generatedHandles}
        style={style}
      >
        {renderFields()}
      </BaseNode>
    );
  };
};
