var optionSkeleton = (optionId, imageUrlFront, imageUrlBack, solutionText) => {
        return(`
    <div id="option-${optionId}-container">
    <div class="flip-card">
    <div class="flip-card-inner">
    <div class="flip-card-front">
    <div class="image" src="${imageUrlFront}"></div><span></span>
    </div>
    <div class="flip-card-back">
    <div class="image" src="${imageUrlBack}"></div><span></span>
    </div>
    </div>
    </div>
    <span class="solution-text">${solutionText}</span>
    </div>
    `)
}

export default optionSkeleton;