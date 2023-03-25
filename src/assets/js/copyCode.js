{/* <pre class="shiki" style="background-color: #2e3440ff" tabindex="0"><div class="language-id">js</div><code><span class="line"><span style="color: #8FBCBB">module</span><span style="color: #ECEFF4">.</span><span style="color: #8FBCBB">exports</span><span style="color: #D8DEE9FF"> </span><span style="color: #81A1C1">=</span><span style="color: #D8DEE9FF"> </span><span style="color: #ECEFF4">{</span></span>
<span class="line sh--add"><span style="color: #D8DEE9FF">    </span><span style="color: #88C0D0">version</span><span style="color: #ECEFF4">:</span><span style="color: #D8DEE9FF"> </span><span style="color: #ECEFF4">'</span><span style="color: #A3BE8C">0.2</span><span style="color: #ECEFF4">'</span><span style="color: #ECEFF4">,</span><span style="color: #D8DEE9FF"> </span></span>
<span class="line sh--add"><span style="color: #D8DEE9FF">    </span><span style="color: #88C0D0">language</span><span style="color: #ECEFF4">:</span><span style="color: #D8DEE9FF"> </span><span style="color: #ECEFF4">'</span><span style="color: #A3BE8C">en</span><span style="color: #ECEFF4">'</span><span style="color: #ECEFF4">,</span><span style="color: #D8DEE9FF"> </span></span>
<span class="line"><span style="color: #ECEFF4">}</span><span style="color: #81A1C1">;</span></span>
<span class="line"></span></code></pre> */}

const copyContent = (content) => {
    navigator.clipboard.writeText(content);
};

const ICON_CLIPBOARD_COPY = `<svg aria-hidden="true" focusable="false" fill=none height=24 stroke=currentColor stroke-linecap=round stroke-linejoin=round stroke-width=2 viewBox="0 0 24 24"width=24 xmlns=http://www.w3.org/2000/svg><rect height=4 rx=1 ry=1 width=8 x=8 y=2></rect><path d="M8 4H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2"></path><path d="M16 4h2a2 2 0 0 1 2 2v4"></path><path d="M21 14H11"></path><path d="m15 10-4 4 4 4"></path></svg>`;
const ICON_CLIPBOARD_CHECK = `<svg aria-hidden="true" focusable="false" fill=none height=24 stroke=currentColor stroke-linecap=round stroke-linejoin=round stroke-width=2 viewBox="0 0 24 24"width=24 xmlns=http://www.w3.org/2000/svg><rect height=4 rx=1 ry=1 width=8 x=8 y=2></rect><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><path d="m9 14 2 2 4-4"></path></svg>`;

const blocks = document.querySelectorAll('pre.shiki');
blocks.forEach((block) => {
    const copyButton = document.createElement('button');
    copyButton.classList.add('copy-button');

    copyButton.textContent = 'Copy';
    copyButton.insertAdjacentHTML('beforeend', ICON_CLIPBOARD_COPY);

    copyButton.addEventListener('click', () => {
        copyContent(block.querySelector('code').textContent);
        copyButton.textContent = 'Copied!';
        copyButton.insertAdjacentHTML('beforeend', ICON_CLIPBOARD_CHECK);
        setTimeout(() => {
            copyButton.textContent = 'Copy';
            copyButton.insertAdjacentHTML('beforeend', ICON_CLIPBOARD_COPY);
        }, 1500);
    });
    block.querySelector('.language-id').appendChild(copyButton);
});