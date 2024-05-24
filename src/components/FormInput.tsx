import { ChangeEvent } from "react";
import Receipt from "../models/Receipt";

interface FormInputProps {
    receipt: Receipt;
    setReceipt: (receipt: Receipt) => void;
    filename: string;
    setFilename: (filename: string) => void
}

const FormInput = ({
    receipt,
    setReceipt,
    filename,
    setFilename
}: FormInputProps) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setReceipt({ ...receipt, [name]: value });
  };

  const handleConceptChange = (index: number, e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updatedConcepts = receipt.concepts.map((concept, i) =>
      i === index ? { ...concept, [name]: value } : concept
    );
    setReceipt({ ...receipt, concepts: updatedConcepts });
  };

  const addConcept = () => {
    setReceipt({
        ...receipt,
        concepts: [
            ...receipt.concepts,
            { name: '', amount: 0 }
        ] 
    });
  };

  const deleteConcept = (index: number) => {
    const updatedConcepts = receipt.concepts.filter((_, i) => i !== index);
    setReceipt({ ...receipt, concepts: updatedConcepts });
  };

  const conceptTotal = receipt.concepts.reduce((total, item) => total + Number(item.amount), 0);

  return (
    <section>
      <div>
        <div className="mb-4">
          <label className="block mb-2">Number of receipt</label>
          <input className="input input-bordered" type="text" id="num" name="num" value={receipt.num} onChange={handleChange} />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Location</label>
          <input className="input input-bordered" type="text" id="location" name="loc" value={receipt.loc} onChange={handleChange} />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Amount</label>
          <input className="input input-bordered" type="text" id="amount" value={`${conceptTotal} €`} disabled />
        </div>
      </div>
      <div>
        <div className="mb-4">
          <label className="block mb-2">Emission date</label>
          <input className="input input-bordered" type="date" id="date" name="date" value={receipt.date} onChange={handleChange} />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Expiration date</label>
          <input className="input input-bordered" type="text" id="exp" name="expiration" value={receipt.expiration} onChange={handleChange} />
        </div>
      </div>
      <div>
        <label className="block mb-2">Concepts</label>
        <ul className="list-disc pl-5">
          {receipt.concepts.map((concept, index) => (
            <li key={index} className="mb-2 flex items-center">
              <input
                className="input input-bordered mr-2"
                type="text"
                name="name"
                placeholder="Concept"
                value={concept.name}
                onChange={(e) => handleConceptChange(index, e)}
              />
              <input
                className="input input-bordered mr-2"
                type="number"
                name="amount"
                placeholder="Amount"
                value={concept.amount}
                onChange={(e) => handleConceptChange(index, e)}
              />
              €
              <button
                className="btn btn-error btn-xs ml-2"
                onClick={() => deleteConcept(index)}
              >
                -
              </button>
            </li>
          ))}
        </ul>
        <button className="btn btn-secondary mt-2" onClick={addConcept}>+</button>
      </div>
      <div className="mb-4">
        <label className="block mb-2">Address:</label>
        <input
          className="input input-bordered"
          type="text"
          id="home"
          name="home"
          placeholder="Write here ..."
          value={receipt.home}
          onChange={handleChange}
        />
      </div>
      <div>
        <div className="mb-4">
          <label className="block mb-2">Payer</label>
          <textarea
            className="textarea textarea-bordered"
            rows={5}
            id="payer"
            name="payer"
            value={receipt.payer}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Collector</label>
          <textarea
            className="textarea textarea-bordered"
            rows={5}
            id="collector"
            name="collector"
            value={receipt.collector}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="mb-4">
        <label className="block mb-2">Filename</label>
        <input
          className="input input-bordered"
          type="text"
          id="filename"
          placeholder="Write here ..."
          value={filename}
          onChange={(e) => setFilename(e.target.value)}
        />
      </div>
    </section>
  );
};

export default FormInput;
