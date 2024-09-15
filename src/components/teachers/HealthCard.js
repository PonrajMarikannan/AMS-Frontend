import React from 'react';

const ChildCard = ({ child, onUpdate }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md w-80 flex-shrink-0">
      <h3 className="text-xl font-semibold mb-2">{child.name}</h3>
      <p><strong>Weight:</strong> {child.weight} kg</p>
      <p><strong>Height:</strong> {child.height} cm</p>
      <p><strong>Nutritional Status:</strong> {child.nutritionalStatus}</p>
      <p><strong>Deficiency:</strong> {child.deficiency}</p>
      <button
        onClick={() => onUpdate(child.childId)}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Update
      </button>
    </div>
  );
};

export default ChildCard;
