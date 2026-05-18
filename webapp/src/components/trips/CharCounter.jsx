function CharCounter({ current, max }) {
  return (
    <span className="text-xs font-medium text-gray-400">
      {current}/{max}
    </span>
  );
}

export default CharCounter;
