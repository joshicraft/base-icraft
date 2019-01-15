// http://kazupon.github.io/vue-i18n/en/messages.html
//  for I18n use the commented out code, for baked an non-dynamic use the json import code.


const requireLang = require.context(
  '@/lang',
  true,
  /\.json$/
)

const messages = {}

for (const file of requireLang.keys()) {
  if (file === './index.js') continue

  const path = file.replace(/(\.\/|\.json$)/g, '').split('/')

  path.reduce((o, s, i) => {
    if (o[s]) return o[s]

    o[s] = i + 1 === path.length
      ? requireLang(file)
      : {}
    return o[s]
  }, messages)
}
export default messages

