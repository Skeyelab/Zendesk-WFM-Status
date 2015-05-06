(function() {
	var tid;

	return {
		requests: {
			getStatus: function() {
				return {
					url: this.setting('wfm_server') + this.currentUser().id() + "?token=" + this.setting('token'),
					type: 'GET'
				};
			}
		},


		events: {
			'app.created': 'startLoop',
			//'pane.activated': 'doSomething',
			'app.willDestroy': 'stopLoop'
		},
		startLoop: function() {

			var inst = this;
			console.log('startTimer this: ', this);
			tid = setInterval(function() {
				console.log('setInterval this: ', this);
				inst.doSomething();
			}, 5000);
			this.store('tid', tid);

			//this.doSomething();
		},
		stopLoop: function(tid) {
			clearInterval(this.store('tid'));
		},
		doSomething: function() {
			console.log(tid);
			this.ajax('getStatus')
				.done(function(data) {
					this.switchTo('layout');
					this.switchTo('status', {
						state: data.selected_state,
						last_ping: data.last_ping,
						ticket: data.ticket
					});

					if (data.selected_state == "active") {
						this.setIconState('active', this.assetURL('icon_top_bar_active.png'));
						this.setIconState('hover', this.assetURL('icon_top_bar_active.png'));
						this.setIconState('inactive', this.assetURL('icon_top_bar_active.png'));
						console.log(this.assetURL('icon_top_bar_active.png'));

					} else if (data.selected_state == "inactive") {
						this.setIconState('inactive', this.assetURL('icon_top_bar_inactive.png'));
						this.setIconState('active', this.assetURL('icon_top_bar_inactive.png'));
						this.setIconState('hover', this.assetURL('icon_top_bar_inactive.png'));
						console.log(this.assetURL('icon_top_bar_active.png'));
					}


				});
		}
	};
}());