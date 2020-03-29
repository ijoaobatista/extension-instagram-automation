/*
* The MIT License (MIT)
*
* Copyright (c) 2018 mLayer JS João Batista
*
* Permission is hereby granted, free of charge, to any person obtaining a copy of
* this software and associated documentation files (the "Software"), to deal in
* the Software without restriction, including without limitation the rights to
* use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
* the Software, and to permit persons to whom the Software is furnished to do so,
* subject to the following conditions:
*
* The above copyright notice and this permission notice shall be included in all
* copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
* FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
* COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
* IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
* CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE
*/

function mLayerJs(account) {
	
	const INSTAGRAM = 'https://instagram.com/';

	let sharedData = null;
	let error = null;
	let response = null;
	let dependence = null;

	// Configuration and data return objects.
	// A sub-object is added according to the service.
	// For certain objects jQuery is required.
	let mLayer = {

		// Reference object for Instagram.
		// Contains objects for returning account data.
		gram: {

			// Set up account information.
			// Uses ajax to return the content.
			// Updates status letiables.
			// Performs dependency checks.
			account: function(data_account, callback) {
				
				if (!window.jQuery) {

					dependence = true;
					error = false;
					console.warn('Attention: mLayer jQuery dependency');
					return;

				}else if (account == '' || account == null) {

					error = true;
					dependence = false;
					console.error('Erro: No accounts set up');
					return;

				}else {

					let data = data_account.replace(/@/g, '').replace(/ /g, '_');

					// Returns the response time
					// Returns the treated data
					// Set status letiables
					$.get(INSTAGRAM+data, function(data) {
						
						sharedData = data.match(/sharedData = {(.*?)};/g);
						sharedData = sharedData[0].replace(/sharedData = (.*?)/g, '$1');

						response = true;
						dependence = false;
						error = false;

						callback();
						
					}).fail(function () {

						error = true;
						dependence = false;
						console.warn('Attention: Account does not exist');
						return;

					});

				}

			},

			// Starting account data settings

			// Returns the name of the account or false in case of failure
			// Uses the parseData () function for character decoding
			fullName: function() {

				if (response == null && error == null && dependence == null) {
					setTimeout(function() { mLayer.gram.fullName(); }, 1000);
				}else if (error == true && dependence == false) {
					return false;
				}else if (dependence == true && error == false) {
					return false;
				}else if (dependence == false && error == false && response == true) {

					let name = sharedData.match(/"full_name":"(.*?)",/g);
					name = name[0].replace(/"full_name":"(.*?)",/g, '$1');
					name = parseData(name);

					return name;

				}

			},

			// Returns the username of the account or false in case of failure
			userName: function () {
				
				if (response == null && error == null && dependence == null) {
					setTimeout(function() { mLayer.gram.userName(); }, 1000);
				}else if (error == true && dependence == false) {
					return false;
				}else if (dependence == true && error == false) {
					return false;
				}else if (dependence == false && error == false && response == true) {

					let username = sharedData.match(/"username":"(.*?)",/g);
					username = username[0].replace(/"username":"(.*?)",/g, '$1');

					return username;

				}

			},

			// Returns the country code of the account or false in case of failure
			countryCode: function () {
				
				if (response == null && error == null && dependence == null) {
					setTimeout(function() { mLayer.gram.countryCode(); }, 1000);
				}else if (error == true && dependence == false) {
					return false;
				}else if (dependence == true && error == false) {		
					return false;
				}else {

					let countrycode = sharedData.match(/"country_code":"(.*?)",/g);
					countrycode = countrycode[0].replace(/"country_code":"(.*?)",/g, '$1');

					return countrycode;

				}

			},

			// Returns the language code of the account or false in case of failure
			languageCode: function () {
				
				if (response == null && error == null && dependence == null) {
					setTimeout(function() { mLayer.gram.languageCode(); }, 1000);
				}else if (error == true && dependence == false) {	
					return false;
				}else if (dependence == true && error == false) {	
					return false;
				}else {

					let languagecode = sharedData.match(/"language_code":"(.*?)",/g);
					languagecode = languagecode[0].replace(/"language_code":"(.*?)",/g, '$1');

					return languagecode;

				}

			},

			// Returns the location code of the account or false in case of failure
			locale: function () {
				
				if (response == null && error == null && dependence == null) {
					setTimeout(function() { mLayer.gram.locale(); }, 1000);
				}else if (error == true && dependence == false) {
					return false;
				}else if (dependence == true && error == false) {
					return false;
				}else {

					let locale = sharedData.match(/"locale":"(.*?)",/g);
					locale = locale[0].replace(/"locale":"(.*?)",/g, '$1');

					return locale;

				}

			},

			// Returns whether the account is private with boolean or false in case of failure
			isPrivate: function () {
				
				if (response == null && error == null && dependence == null) {
					setTimeout(function() { mLayer.gram.isPrivate(); }, 1000);
				}else if (error == true && dependence == false) {
					return false;
				}else if (dependence == true && error == false) {
					return false;
				}else {

					let private = sharedData.match(/"is_private":(.*?),"/g);
					private = private[0].replace(/"is_private":(.*?),"/g, '$1');

					return private;

				}

			},

			// Returns whether the account is checked with boolean or false in case of failure
			isVerified: function () {
				
				if (response == null && error == null && dependence == null) {
					setTimeout(function() { mLayer.gram.isVerified(); }, 1000);
				}else if (error == true && dependence == false) {
					return false;
				}else if (dependence == true && error == false) {
					return false;
				}else {

					let verified = sharedData.match(/"is_verified":(.*?),"/g);
					verified = verified[0].replace(/"is_verified":(.*?),"/g, '$1');

					return verified;

				}

			},

			// Returns the number of account followers or false in case of failure
			followers: function () {
				
				if (response == null && error == null && dependence == null) {
					setTimeout(function() { mLayer.gram.followers(); }, 1000);
				}else if (error == true && dependence == false) {
					return false;
				}else if (dependence == true && error == false) {
					return false;
				}else {

					let followers = sharedData.match(/"edge_followed_by":{"count":(.*?)},/g);
					followers = followers[0].replace(/"edge_followed_by":{"count":(.*?)},/g, '$1');
					return parseInt(followers);

				}

			},

			// Returns the tracking number of the account or false in case of failure
			follow: function () {
				
				if (response == null && error == null && dependence == null) {
					setTimeout(function() { mLayer.gram.follow(); }, 1000);
				}else if (error == true && dependence == false) {
					return false;
				}else if (dependence == true && error == false) {
					return false;
				}else {

					let follow = sharedData.match(/"edge_follow":{"count":(.*?)},/g);
					follow = follow[0].replace(/"edge_follow":{"count":(.*?)},/g, '$1');

					return parseInt(follow);

				}

			},

			// Returns the full link of the account image 150x150 px or false in case of failure
			profilePicSmall: function () {
				
				if (response == null && error == null && dependence == null) {
					setTimeout(function() { mLayer.gram.profilePicSmall(); }, 1000);
				}else if (error == true && dependence == false) {
					return false;
				}else if (dependence == true && error == false) {
					return false;
				}else {

					let profileimagetiny = sharedData.match(/"profile_pic_url":"(.*?)",/g);
					profileimagetiny = decodeURIComponent(JSON.parse('"'+profileimagetiny[0].replace(/"profile_pic_url":"(.*?)",/g, '$1')+'"'));

					return profileimagetiny;

				}

			},

			// Returns the full link of the account image 320x320 px or false in case of failure
			profilePicLarge: function () {
				
				if (response == null && error == null && dependence == null) {
					setTimeout(function() { mLayer.gram.profilePicLarge(); }, 1000);
				}else if (error == true && dependence == false) {
					return false;
				}else if (dependence == true && error == false) {
					return false;
				}else {

					let profileimagelarge = sharedData.match(/"profile_pic_url_hd":"(.*?)",/g);
					profileimagelarge = decodeURIComponent(JSON.parse('"'+profileimagelarge[0].replace(/"profile_pic_url_hd":"(.*?)",/g, '$1')+'"'));

					return profileimagelarge;

				}

			},

			// Returns the text field of the account biography or false in case of failure
			// Uses the parseData () failing to decode characters
			// Check if there is a biography
			// Returns null if empty
			biography: function () {
				
				if (response == null && error == null && dependence == null) {
					setTimeout(function() { mLayer.gram.biography(); }, 1000);
				}else if (error == true && dependence == false) {
					return false;
				}else if (dependence == true && error == false) {
					return false;
				}else {

					let biography = sharedData.match(/"biography":"(.*?)",/g);

					if (biography == '' || biography == null) {
						return null;
					}else {

						biography = biography[0].replace(/"biography":"(.*?)",/g, '$1');
						biography = parseData(biography);

						return biography;

					}

				}

			},

			// Returns the full link in the account url field or false in case of failure
			// Check if there is a link
			// Returns null if empty
			externalURL: function () {
				
				if (response == null && error == null && dependence == null) {
					setTimeout(function() { mLayer.gram.externalURL(); }, 1000);
				}else if (error == true && dependence == false) {
					return false;
				}else if (dependence == true && error == false) {
					return false;
				}else {

					let externalurl = sharedData.match(/"external_url":"(.*?)"/g);

					if (externalurl == null) {
						return null;
					}else {

						externalurl = externalurl[0].replace(/"external_url":"(.*?)"/g, '$1');

						return externalurl;

					}

				}

			},

			// Returns total postings from the account or false in case of failure
			totalMedia: function () {
				
				if (response == null && error == null && dependence == null) {
					setTimeout(function() { mLayer.gram.totalMedia(); }, 1000);
				}else if (error == true && dependence == false) {
					return false;
				}else if (dependence == true && error == false) {
					return false;
				}else {

					let totalmedia = sharedData.match(/"edge_owner_to_timeline_media":{"count":(.*?),"/g);
					totalmedia = totalmedia[0].replace(/"edge_owner_to_timeline_media":{"count":(.*?),"/g, '$1');

					return parseInt(totalmedia);

				}

			},

			// Returns the temporary token of the account account or false in case of failure
			token: function () {
				
				if (response == null && error == null && dependence == null) {
					setTimeout(function() { mLayer.gram.token(); }, 1000);
				}else if (error == true && dependence == false) {
					return false;
				}else if (dependence == true && error == false) {
					return false;
				}else {

					let token = sharedData.match(/"csrf_token":"(.*?)",/g);
					token = token[0].replace(/"csrf_token":"(.*?)",/g, '$1');

					return token;

				}

			},

			// Returns the account id along with the tag or false on failure
			loggingPageId: function () {
				
				if (response == null && error == null && dependence == null) {
					setTimeout(function() { mLayer.gram.loggingPageId(); }, 1000);
				}else if (error == true && dependence == false) {
					return false;
				}else if (dependence == true && error == false) {
					return false;
				}else {

					let lgpageid = sharedData.match(/"logging_page_id":"(.*?)",/g);
					lgpageid = lgpageid[0].replace(/"logging_page_id":"(.*?)",/g, '$1');

					return lgpageid;

				}

			},

			// Returns only the account id number or false in case of failure
			id: function () {
				
				if (response == null && error == null && dependence == null) {
					setTimeout(function() { mLayer.gram.id(); }, 1000);
				}else if (error == true && dependence == false) {
					return false;
				}else if (dependence == true && error == false) {
					return false;
				}else {

					let id = sharedData.match(/"id":"(.*?)",/g);
					id = id[0].replace(/"id":"(.*?)",/g, '$1');

					return parseInt(id);

				}

			},

			// Returns a list of the best posts in the account or false in case of failure
			// Publications of the original size
			// Returns null if account is private
			displayUrl: function(limit) {
				
				if (response == null && error == null && dependence == null) {
					setTimeout(function() { mLayer.gram.displayUrl(); }, 1000);
				}else if (error == true && dependence == false) {
					return false;
				}else if (dependence == true && error == false) {
					return false;
				}else {

					let display = [];
					let displayurl = sharedData.match(/"display_url":"(.*?)",/g);

					if (limit === 'all') {

						for (let i = 0; i < displayurl.length; i++) {
							display[i] = decodeURIComponent(JSON.parse('"'+displayurl[i].replace(/"display_url":"(.*?)",/g, '$1')+'"'));
						};
					}else {

						for (let i = 0; i < limit.limit; i++) {
							display[i] = decodeURIComponent(JSON.parse('"'+displayurl[i].replace(/"display_url":"(.*?)",/g, '$1')+'"'));
						};
					}

					return display;

				}

			},

			// Returns the last image posted from the account or false in case of failure
			// Returns null if there is no private account
			lastPost: function () {
				
				if (response == null && error == null && dependence == null) {
					setTimeout(function() { mLayer.gram.lastPost(); }, 1000);
				}else if (error == true && dependence == false) {
					return false;
				}else if (dependence == true && error == false) {
					return false;
				}else {

					let lastpost = sharedData.match(/"display_url":"(.*?)",/g);

					if (lastpost == null) {
						return null;
					}else {

						lastpost = decodeURIComponent(JSON.parse('"'+lastpost[0].replace(/"display_url":"(.*?)",/g, '$1')+'"'));
						return lastpost;

					}
				}
			}
		}
	};

	// DEFINITIONS OF CLASS METHODS

	// Return methods based on the private object created
	// Set selectors for data definition

	this.fullName = function(seletor = null, type = 'text', callback) {

		mLayer.gram.account(account, function() {
		
			let content = mLayer.gram.fullName();

			if (type == 'text' && seletor != null) {
				$(seletor).text(content);
			}else if (type == 'value' && seletor != null) {
				$(seletor).val(content);
			}else if (type == 'pre_join' && seletor != null) {
				$(seletor).prepend(content);
			}else if (type == 'join' && seletor != null) {
				$(seletor).append(content);
			}else if (type == 'text' && seletor == null) {
				callback(content);
			}
		});
	};

	this.userName = function (seletor = null, type = 'ref', callback) {

		mLayer.gram.account(account, function() {
			
			let content = mLayer.gram.userName();

			if (type == 'text' && seletor != null) {
				$(seletor).text(content);
			}else if (type == 'value' && seletor != null) {
				$(seletor).val(content);
			}else if (type == 'pre_join' && seletor != null) {
				$(seletor).prepend(content);
			}else if (type == 'join' && seletor != null) {
				$(seletor).append(content);
			}else if (type == 'ref' && seletor != null) {
				$(seletor).text('@'+content);
			}else if (type == 'join_ref' && seletor != null) {
				$(seletor).append('@'+content);
			}else if (type == 'pre_join_ref' && seletor != null) {
				$(seletor).prepend('@'+content);
			}else if (type == 'ref' && seletor == null) {
				callback(content);
			}
		});
	};

	this.countryCode = function (seletor = null, type = 'text', callback) {
		
		mLayer.gram.account(account, function() {

			let content = mLayer.gram.countryCode();

			if (type == 'text' && seletor != null) {
				$(seletor).text(content);
			}else if (type == 'value' && seletor != null) {
				$(seletor).val(content);
			}else if (type == 'pre_join' && seletor != null) {
				$(seletor).prepend(content);
			}else if (type == 'join' && seletor != null) {
				$(seletor).append(content);
			}else if (type == 'text' && seletor == null) {
				callback(content);
			}
		});
	};

	this.languageCode = function (seletor = null, type = 'text', callback) {
		
		mLayer.gram.account(account, function() {

			let content = mLayer.gram.languageCode();

			if (type == 'text' && seletor != null) {
				$(seletor).text(content);
			}else if (type == 'value' && seletor != null) {
				$(seletor).val(content);
			}else if (type == 'pre_join' && seletor != null) {
				$(seletor).prepend(content);
			}else if (type == 'join' && seletor != null) {
				$(seletor).append(content);
			}else if (type == 'text' && seletor == null) {
				callback(content);
			}
		})
	};

	this.locale = function (seletor = null, type = 'text', callback) {
		
		mLayer.gram.account(account, function() {

			let content = mLayer.gram.locale();

			if (type == 'text' && seletor != null) {
				$(seletor).text(content);
			}else if (type == 'value' && seletor != null) {
				$(seletor).val(content);
			}else if (type == 'pre_join' && seletor != null) {
				$(seletor).prepend(content);
			}else if (type == 'join' && seletor != null) {
				$(seletor).append(content);
			}else if (type == 'text' && seletor == null) {
				callback(content);
			}
		});
	};

	this.isPrivate = function (seletor = null, type = 'text', callback) {
		
		mLayer.gram.account(account, function() {

			let content = mLayer.gram.isPrivate();

			if (type == 'text' && seletor != null) {
				$(seletor).text(content);
			}else if (type == 'value' && seletor != null) {
				$(seletor).val(content);
			}else if (type == 'pre_join' && seletor != null) {
				$(seletor).prepend(content);
			}else if (type == 'join' && seletor != null) {
				$(seletor).append(content);
			}else if (type == 'text' && seletor == null) {
				callback(content);
			}
		});
	};

	this.isVerified = function (seletor = null, type = 'text', callback) {
		
		mLayer.gram.account(account, function() {

			let content = mLayer.gram.isVerified();

			if (type == 'text' && seletor != null) {
				$(seletor).text(content);
			}else if (type == 'value' && seletor != null) {
				$(seletor).val(content);
			}else if (type == 'pre_join' && seletor != null) {
				$(seletor).prepend(content);
			}else if (type == 'join' && seletor != null) {
				$(seletor).append(content);
			}else if (type == 'text' && seletor == null) {
				callback(content);
			}
		});
	};

	this.followers = function (seletor = null, type = 'text', callback) {
		
		mLayer.gram.account(account, function() {

			let content = mLayer.gram.followers();

			if (type == 'text' && seletor != null) {
				$(seletor).text(content);
			}else if (type == 'value' && seletor != null) {
				$(seletor).val(content);
			}else if (type == 'pre_join' && seletor != null) {
				$(seletor).prepend(content);
			}else if (type == 'join' && seletor != null) {
				$(seletor).append(content);
			}else if (type == 'text' && seletor == null) {
				callback(content);
			}
		});
	};

	this.follow = function (seletor = null, type = 'text', callback) {
		
		mLayer.gram.account(account, function() {

			let content = mLayer.gram.follow();

			if (type == 'text' && seletor != null) {
				$(seletor).text(content);
			}else if (type == 'value' && seletor != null) {
				$(seletor).val(content);
			}else if (type == 'pre_join' && seletor != null) {
				$(seletor).prepend(content);
			}else if (type == 'join' && seletor != null) {
				$(seletor).append(content);
			}else if (type == 'text' && seletor == null) {
				callback(content);
			}
		});
	};

	this.profilePicSmall = function (seletor = null, type = 'text', callback) {
		
		mLayer.gram.account(account, function() {

			let content = mLayer.gram.profilePicSmall();

			if (type == 'text' && seletor != null) {
				$(seletor).text(content);
			}else if (type == 'value' && seletor != null) {
				$(seletor).val(content);
			}else if (type == 'pre_join' && seletor != null) {
				$(seletor).prepend(content);
			}else if (type == 'join' && seletor != null) {
				$(seletor).append(content);
			}else if (type == 'graph_src' && seletor != null) {
				$(seletor).attr({
					'src': content,
					'alt': content
				});
			}else if (type == 'graph_css' && seletor != null) {
				$(seletor).css('background-image', 'url('+content+')');
			}else if (type == 'text' && seletor == null) {
				callback(content);
			}
		});
	};

	this.profilePicLarge = function (seletor = null, type = 'text', callback) {
		
		mLayer.gram.account(account, function() {

			let content = mLayer.gram.profilePicLarge();

			if (type == 'text' && seletor != null) {
				$(seletor).text(content);
			}else if (type == 'value' && seletor != null) {
				$(seletor).val(content);
			}else if (type == 'pre_join' && seletor != null) {
				$(seletor).prepend(content);
			}else if (type == 'join' && seletor != null) {
				$(seletor).append(content);
			}else if (type == 'graph_src' && seletor != null) {
				$(seletor).attr({
					'src': content,
					'alt': content
				});
			}else if (type == 'graph_css' && seletor != null) {
				$(seletor).css('background-image', 'url('+content+')');
			}else if (type == 'text' && seletor == null) {
				callback(content);
			}
		});
	};

	this.biography = function (seletor = null, type = 'text', callback) {

		mLayer.gram.account(account, function() {

			let content = mLayer.gram.biography();

			if (type == 'text' && seletor != null) {
				$(seletor).text(content);
			}else if (type == 'value' && seletor != null) {
				$(seletor).val(content);
			}else if (type == 'pre_join' && seletor != null) {
				$(seletor).prepend(content);
			}else if (type == 'join' && seletor != null) {
				$(seletor).append(content);
			}else if (type == 'text' && seletor == null) {
				callback(content);
			}
		});
	};

	this.externalURL = function (seletor = null, type = 'text', callback) {
		
		mLayer.gram.account(account, function() {

			let content = mLayer.gram.externalURL();

			if (type == 'text' && seletor != null) {
				$(seletor).text(content);
			}else if (type == 'value' && seletor != null) {
				$(seletor).val(content);
			}else if (type == 'pre_join' && seletor != null) {
				$(seletor).prepend(content);
			}else if (type == 'join' && seletor != null) {
				$(seletor).append(content);
			}else if (type == 'link' && seletor != null) {
				$(seletor).attr('href', content);
			}else if (type == 'external_link' && seletor != null) {
				$(seletor).attr({
					'href': content,
					'target': '_blank'
				});
			}else if (type == 'text' && seletor == null) {
				callback(content);
			}
		});
	};

	this.totalMedia = function (seletor = null, type = 'text', callback) {
		
		mLayer.gram.account(account, function() {

			let content = mLayer.gram.totalMedia();

			if (type == 'text' && seletor != null) {
				$(seletor).text(content);
			}else if (type == 'value' && seletor != null) {
				$(seletor).val(content);
			}else if (type == 'pre_join' && seletor != null) {
				$(seletor).prepend(content);
			}else if (type == 'join' && seletor != null) {
				$(seletor).append(content);
			}else if (type == 'text' && seletor == null) {
				callback(content);
			}
		});
	};

	this.token = function (seletor = null, type = 'text', callback) {
		
		mLayer.gram.account(account, function() {

			let content = mLayer.gram.token();

			if (type == 'text' && seletor != null) {
				$(seletor).text(content);
			}else if (type == 'value' && seletor != null) {
				$(seletor).val(content);
			}else if (type == 'pre_join' && seletor != null) {
				$(seletor).prepend(content);
			}else if (type == 'join' && seletor != null) {
				$(seletor).append(content);
			}else if (type == 'text' && seletor == null) {
				callback(content);
			}
		});
	};

	this.loggingPageId = function (seletor = null, type = 'text', callback) {
		
		mLayer.gram.account(account, function() {

			let content = mLayer.gram.loggingPageId();

			if (type == 'text' && seletor != null) {
				$(seletor).text(content);
			}else if (type == 'value' && seletor != null) {
				$(seletor).val(content);
			}else if (type == 'pre_join' && seletor != null) {
				$(seletor).prepend(content);
			}else if (type == 'join' && seletor != null) {
				$(seletor).append(content);
			}else if (type == 'text' && seletor == null) {
				callback(content);
			}
		});
	};

	this.id = function (seletor = null, type = 'text', callback) {
		
		mLayer.gram.account(account, function() {

			let content = mLayer.gram.id();

			if (type == 'text' && seletor != null) {
				$(seletor).text(content);
			}else if (type == 'value' && seletor != null) {
				$(seletor).val(content);
			}else if (type == 'pre_join' && seletor != null) {
				$(seletor).prepend(content);
			}else if (type == 'join' && seletor != null) {
				$(seletor).append(content);
			}else if (type == 'text' && seletor == null) {
				callback(content);
			}
		});
	};

	this.displayUrl = function (seletor, type = 'last_text', config, callback) {
		
		mLayer.gram.account(account, function() {

			let content = mLayer.gram.lastPost();

			if (type == 'last_text' && seletor != null) {
				$(seletor).text(content);
			}else if (type == 'last_value' && seletor != null) {
				$(seletor).val(content);
			}else if (type == 'last_pre_join' && seletor != null) {
				$(seletor).prepend(content);
			}else if (type == 'last_join' && seletor != null) {
				$(seletor).append(content);
			}else if (type == 'last_graph_src' && seletor != null) {
				$(seletor).attr({
					'src': content,
					'alt': content
				});
			}else if (type == 'last_graph_css' && seletor != null) {
				$(seletor).css('background-image', 'url('+content+')');
			}else if (type == 'all_graph_list' && seletor == null) {
				callback(mLayer.gram.displayUrl(config));
			}
		});
	};

	// Decoder function of special characters
	// Uses the parseJSON()
	// Returns the string
	function parseData(param) {
		let str = JSON.parse('"'+param+'"');
		return str;
	};

}