/*	@param url - request identificator
	@param params - params for url request
	@param options - custom setting for request
*/

export const Api = (url, params = {}, options = {}) => {
	const myRequest = new URL(url, "http://localhost:3000");
	if (params !== {}){
		Object.keys(params).forEach(key => 
				addToUrlParams(myRequest, key, params[key])
				);
	}

	return sendApiRequest(myRequest, options);
};

export const ApiGet = (url) => {
	return Api(url);
};

function sendApiRequest(request, options) {
	return fetch(request, options)
		.then(response => {
				if (!response.ok){
					throw response
				}
				return response.json()
				})
		.catch(error => console.error('Error:', error));
};

function addToUrlParams(request, index, value) {
	const params = new URLSearchParams(request);
	if(value != null && value !==''){
		params.append(index, value);
	};
};

export default Api;