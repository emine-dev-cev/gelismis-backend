from app import create_app, db
from app.models.user import User
from app.models.post import Post

app = create_app()
with app.app_context():
    rapunzel = User.query.filter_by(username='Rapunzel').first()
    if rapunzel:
        # Eski gönderileri temizleyelim (yeni görsel odaklı akış için)
        Post.query.filter_by(user_id=rapunzel.id).delete()
        
        # 1. Gönderi: Kule ve Fenerler
        p1 = Post(
            title="Işıklar Benim İçinmiş! 🏮",
            content="Her yıl doğum günümde kulemden izlediğim o parlayan ışıkların içine sonunda girdim. Hayat kuledekinden çok daha büyük ve parlak! ✨",
            image_url="/v2/assets/themes/rapunzel_post_tower.png",
            user_id=rapunzel.id
        )
        
        # 2. Gönderi: Sihirli Çiçek
        p2 = Post(
            title="Sihirli Dokunuş 🌼",
            content="Güneşten gelen o küçük bir damla... Her şeyin başladığı o sihirli çiçek. Bazen en büyük mucizeler en küçük şeylerde gizlidir.",
            image_url="/v2/assets/themes/rapunzel_post_flower.png",
            user_id=rapunzel.id
        )
        
        db.session.add(p1)
        db.session.add(p2)
        db.session.commit()
        print("Rapunzel'in paylaşımları yayında! 🚀")
