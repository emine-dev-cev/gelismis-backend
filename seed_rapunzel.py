from app import create_app, db
from app.models.user import User
from app.models.post import Post
from werkzeug.security import generate_password_hash

app = create_app()
with app.app_context():
    # 1. Rapunzel kullanıcısını oluştur veya bul
    rapunzel = User.query.filter_by(username='Rapunzel').first()
    if not rapunzel:
        rapunzel = User(
            username='Rapunzel',
            email='rapunzel@disney.com',
            password_hash=generate_password_hash('tower123')
        )
        db.session.add(rapunzel)
        db.session.commit()

    # 2. Rapunzel'in gönderilerini ekle
    posts = [
        {
            "title": "Gökyüzündeki Işıklar! 🏮",
            "content": "Sonunda kulemden çıktım ve her yıl doğum günümde parlayan o ışıkların ne olduğunu anladım. Onlar fenerlermiş ve hepsi benim içinmiş! Hayatın en güzel gecesiydi. ✨"
        },
        {
            "title": "Yeni Hobiler, Yeni Heyecanlar 🎨",
            "content": "Kuledeyken sadece resim yapardım ama artık dünyayı boyuyorum! Her yer çiçeklerle ve renklerle dolu. Pascal bile bu kadar yeşili ilk kez görüyor! 🦎"
        }
    ]

    for p in posts:
        new_post = Post(title=p['title'], content=p['content'], user_id=rapunzel.id)
        db.session.add(new_post)
    
    db.session.commit()
    print("Rapunzel'in dünyası başarıyla kuruldu! ✨")
