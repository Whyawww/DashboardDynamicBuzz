# netlify/functions/api.py

import sys
import os
from mangum import Mangum

# Tambahkan direktori 'backend' ke path agar kita bisa import 'app'
sys.path.append(os.path.join(os.path.dirname(__file__), '..', '..', 'backend'))

# Import instance 'app' dari file main.py Anda
from app.main import app

# Buat handler yang akan dijalankan oleh Netlify
handler = Mangum(app, lifespan="off")