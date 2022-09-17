import app from './config/app.js'

import { createConnection } from './database.js'

createConnection()

app.listen(app.get('port'))
console.log('🚀 Server is running on port', app.get('port'))