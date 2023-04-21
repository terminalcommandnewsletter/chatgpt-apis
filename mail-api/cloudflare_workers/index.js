export default {
	async fetch(request, env) {
		try {
			const { pathname } = new URL(request.url);

			if (pathname.startsWith("/email")) {
				const email = decodeURIComponent(pathname.split("/")[2]);
				const subject = decodeURIComponent(pathname.split("/")[3]);
				const mailContent = decodeURIComponent(pathname.split("/")[4]);
				let emailBody = JSON.stringify({
				personalizations: [
					{
						to: [{ email: email, name: email }],
					},
				],
				from: {
					email: "[INSERT FROM EMAIL HERE]",
					name: "[INSERT FROM NAME HERE]",
				},
				subject: subject,
				content: [
					{
						type: 'text/html',
						value: mailContent
					},
				],
			})

			await fetch('https://api.mailchannels.net/tx/v1/send', {
				method: 'POST',
				headers: {
					'content-type': 'application/json',
				},
				body: emailBody,
			})
			return new Response(null,{ status: 200 });
		}
		return new Response(null,{ status: 404 })
		} catch(e) {
			return new Response(err.stack, { status: 500 })
		}
	}
}
