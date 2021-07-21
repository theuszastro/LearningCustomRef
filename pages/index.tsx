import React, { useImperativeHandle, useRef } from 'react';

type ElementRefData = {
   focus: () => void;
   getValue: () => string;
};

const Element = (props: { reference: React.MutableRefObject<undefined | ElementRefData> }) => {
   const inputRef = useRef<HTMLInputElement>(null);

   const { reference } = props;

   useImperativeHandle(reference, () => {
      return {
         focus: () => {
            inputRef.current?.focus();
         },
         getValue: () => {
            return inputRef.current?.value ?? '';
         },
      };
   });

   return (
      <div>
         <input ref={inputRef} />
      </div>
   );
};

const pages: React.FC = () => {
   const elementRef = useRef<ElementRefData>();

   return (
      <div>
         <Element reference={elementRef} />

         <button onClick={() => elementRef.current?.focus()}>Focus</button>
         <button onClick={() => alert(elementRef.current?.getValue())}>getValue</button>
      </div>
   );
};

export default pages;
