

document.addEventListener('DOMContentLoaded', () => {

    const evm = new Vue()

    Vue.component('input-message', {
        name: "inputMessage",
        data() {
            return {
                value: "",
                placeholder: "Enter your name",

            }
        },
        props: ['state'],
        created() {
        },
        watch: {
            state(n, o) {
                console.log(n, o)
            }
        },
        methods: {
            send() {
                if (this.value.length > 0) {
                    if (!this.state) {
                        evm.$emit('connect', this.value)
                        this.placeholder = "Enter your message"
                    }
                    else {
                        evm.$emit('sendMessage', this.value)
                    }
                    this.value = ""
                }
            }
        },
        template: document.querySelector('template')
    })

    const app = new Vue({
        el: "#app",
        data() {
            return {
                connected: false,
                name: "",
                socket: false,
                messages: []
            }
        },
        created() {
            this.socket = io()
            this.socket.on('returnMessages', this.showMessages)
            evm.$on('connect', this.connect)
            evm.$on('sendMessage', this.sendMessage)
        },
        methods: {
            connect(name) {
                this.name = name
                this.socket.emit('userConnect', { name: this.name })
                this.connected = true
            },
            sendMessage(message) {
                this.socket.emit('sendMessage', { message })
            },
            showMessages(messages) {
                this.messages = messages.map(message => {
                    const sent = message.user == this.name ? true : false
                    const content = message.message.message
                    const date = new Date(message.date)
                    const author = message.user
                    return {
                        sent, content, date: `${date.getDate()}/${date.getMonth().toString().padStart(2, '0')}`, author
                    }
                })
                console.log(this.messages)
            }
        },
    })
})