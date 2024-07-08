import { useState, ChangeEvent } from 'react';
import Receipt from '../models/Receipt';

export const useConcepts = (initialConcepts: Receipt['concepts']) => {
  const [concepts, setConcepts] = useState(initialConcepts);

  const handleConceptChange = (index: number, e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updatedConcepts = concepts.map((concept, i) => (i === index ? { ...concept, [name]: value } : concept));
    setConcepts(updatedConcepts);
  };

  const addConcept = () => {
    setConcepts([...concepts, { name: '', amount: 0 }]);
  };

  const deleteConcept = (index: number) => {
    const updatedConcepts = concepts.filter((_, i) => i !== index);
    setConcepts(updatedConcepts);
  };

  return {
    concepts,
    handleConceptChange,
    addConcept,
    deleteConcept,
  };
};
