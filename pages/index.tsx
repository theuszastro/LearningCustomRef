import React, { useImperativeHandle, useRef, forwardRef } from 'react';

type ElementRefData = {
   focus: () => void;
   getValue: () => string;
};

const Element = forwardRef<ElementRefData | undefined>((_, ref) => {
   const inputRef = useRef<HTMLInputElement>(null);

   useImperativeHandle(ref, () => {
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
});

const pages: React.FC = () => {
   const elementRef = useRef<ElementRefData>();

   return (
      <div>
         <Element ref={elementRef} />

         <button onClick={() => elementRef.current?.focus()}>Focus</button>
         <button onClick={() => alert(elementRef.current?.getValue())}>getValue</button>
      </div>
   );
};

export default pages;
