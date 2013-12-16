var config = {
	api: {
		sender: "YOURKEYHERE",
        monitorUrl: "http://www.wienerlinien.at/ogd_realtime/monitor?rbl=4116&rbl=4427&rbl=4410&rbl=42&rbl=22&rbl=134&rbl=5504&rbl=5505&rbl=5507&rbl=5508&rbl=5502&rbl=5503&rbl=5501&rbl=2934&rbl=4113&sender="
	}
};

exports.getSettings = function() {
	return config;
};