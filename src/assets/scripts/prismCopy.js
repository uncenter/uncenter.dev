const buttonLabel = "Copy";

let codeBlocks = document.querySelectorAll("pre");

codeBlocks.forEach((block) => {
    if (navigator.clipboard) {
    let button = document.createElement("button");

    button.innerText = buttonLabel;
    block.appendChild(button);

    button.addEventListener("click", async () => {
        await copyCode(block, button);
    });
    }
});

async function copyCode(block, button) {
    let text = block.querySelector("code").innerText;

    await navigator.clipboard.writeText(text);

    button.innerText = "Code Copied!";

    setTimeout(() => {button.innerText = buttonLabel;}, 1000);
}

