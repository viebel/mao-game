export default function ClickableDie(handleDieClick, selectedNumbers, die, index) {
    return (
      die.isActive && (
        <div
          key={index}
          className={`clickable-die ${selectedNumbers && (selectedNumbers.index === die.index) ? 'selected-die' : ''}`}
          onClick={() => handleDieClick(die.value, die.index)}
        >
          {die.value}
        </div>)
    );
  }