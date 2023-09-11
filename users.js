import http from 'k6/http';
import { check } from 'k6';
import { group } from 'k6'

export const options = {
	stages: [
		{ duration: '20s', target: 10 }, // total virtual user pada durasi tertenu
		{ duration: '5s', target: 0 },
	],
	thresholds: {
		http_req_failed: ['rate<0.10'], // http errors should be less than 10%
		http_req_duration: ['p(95)<2000'], // 95% requests should be below 2s
	},
}

var response;
let token = "ad505909f498b845e94477fa92a8f0f6987d4fafbf77c8a8b5a64266aa5f92e9"

let url = 'https://gorest.co.in/public/v2'; // dev

export default function main() {
	group('get all Users', function () {
		response = http.get(url + '/users', {
			headers: {
				'Authorization': 'Bearer ' + token,
			},
		})

		console.log('get all Users: ' + response.status);

		check(response, {
			'get all get all Users status 200': (r) => r.status == 200
		});
	}
	)
}
