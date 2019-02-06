export default {

    sounds: [],
    playSound(file, volume) {
        console.log(this)
        let newSound
        let found = this.sounds.find(sound => sound.id === file)
        if (!found) {
            newSound = {
                id: file,
                data: new Audio('/static/sound/' + file + '.mp3')
            }
            newSound.data.volume = volume || 1
            this.sounds.unshift(newSound)
        } else {
            newSound = found
        }

        newSound.data.play()
    }
}