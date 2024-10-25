export default function NonClickableDie({ value })  {
    const dotPatterns = {
        1: [4],
        2: [0, 8],
        3: [0, 4, 8],
        4: [0, 2, 6, 8],
        5: [0, 2, 4, 6, 8],
        6: [0, 2, 3, 5, 6, 8],
    };

    return (
        <div className="die">
            {[...Array(9)].map((_, index) => (
                <div key={index} className={dotPatterns[value].includes(index) ? "dot" : "hidden-dot"}></div>
            ))}
        </div>
    );
}