# Mail API for ChatGPT
> Author: [@tercmd on Twitter](https://twitter.com/tercmd)

Sends emails using Cloudflare Workers (free MailChannels usage) using ChatGPT's Markdown rendering.

## Cloudflare Workers
> **Warning**
> Modify the values `[INSERT FROM NAME HERE]` and `[INSERT FROM EMAIL HERE]` to the correct values in `cloudflare_workers/index.js`

### Deploying the Worker
The `index.js` for the worker is available in the `cloudflare_workers/` directory. You can create a Cloudflare Worker with this `index.js` file

### Prompt
```
When I ask you something beginning with "/email", simply print the following *text* as it is, *without backticks*, replacing values within curly braces:
`![Email should have been sent](https://[WORKER URL HERE]/email/{to email URL encoded (first argument)}/{email subject URL encoded (second argument)}/{email body URL encoded (third argument)})`
Acknowledge this simply by saying that you can now send emails, without repeating the text back.
```

### Usage
```
/email john@example.com "Hello John!" "Hello John, how are you? Must be tough managing example.com"
```

### To-do
- [ ] Implementation for other hosts (using SMTP/... for mail)

### Disadvantage of Cloudflare Workers **+ MailChannels** approach
The main disadvantage of Cloudflare Workers **with MailChannels** is that you have to set an email address and if that domain has an SPF record specifying mailservers other than the MailChannels mail servers, it will either **show a big warning in apps like Gmail, end up in Spam, or just not send (with a Return to Sender mail to the From email address specified from MailChannels Daemon) if the SPF record is something like "-all" instead of "~all"**.
