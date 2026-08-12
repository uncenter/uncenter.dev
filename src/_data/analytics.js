const analytics = {
	url: 'https://origami.uncenter.dev',
	websiteId: 'dea82084-7eb8-4337-b02c-23f6ace1afc1',
	shareId: 'Atf7LPtQCPGa0643',
};

export default {
	...analytics,
	script: `${analytics.url}/script.js`,
	share: `${analytics.url}/share/${analytics.shareId}`,
};
