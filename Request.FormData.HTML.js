Request.FormData = new Class({
	
	Extends : Request.HTML,

	initialize: function(options) {
		this.xhr = new Browser.Request();
		this.formData = new FormData();
		this.setOptions(options);
		this.headers = this.options.headers;
	},

	append: function(key, value) {
		this.formData.append(key, value);
		return this.formData;
	},

	reset: function() {
		this.formData = new FormData();
	},
	
	send: function() {
		
		this.options.isSuccess = this.options.isSuccess || this.isSuccess;
		this.running = true;
		
		var xhr = this.xhr;
		
		xhr.open('POST', this.options.url, true);
		xhr.onreadystatechange = this.onStateChange.bind(this);
		
		Object.each(this.headers, function(value, key) {
			try {
				xhr.setRequestHeader(key, value);
			} catch (e) {
				this.fireEvent('exception', [key, value]);
			}
		}, this);
		
		this.fireEvent('request');
		xhr.send(this.formData);
		
		if (!this.options.async) this.onStateChange();
		if (this.options.timeout) this.timer = this.timeout.delay(this.options.timeout, this);
		return this;

	}
	
});