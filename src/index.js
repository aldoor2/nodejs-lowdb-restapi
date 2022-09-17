import app from './config/express.js'

import { createConnection } from './database.js'

createConnection()

app.listen(app.get('port'))
console.log('🚀 Server is running on port', app.get('port'))