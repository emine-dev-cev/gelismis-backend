from app import create_app, db
from app.models.user import User
from app.models.post import Post
from werkzeug.security import generate_password_hash

app = create_app()
with app.app_context():
    # 1. Lorin (Ariel) kullanıcısını oluştur veya bul
    lorin = User.query.filter_by(username='Lorin').first()
    if not lorin:
        lorin = User(
            username='Lorin',
            email='lorin@disney.com',
            password_hash=generate_password_hash('ocean123')
        )
        db.session.add(lorin)
        db.session.commit()

    # Eski gönderileri temizle
    Post.query.filter_by(user_id=lorin.id).delete()

    # 2. Lorin'in paylaşımlarını ekle
    p1 = Post(
        title="Dünyaların Üstünde 🧜🏻‍♀️",
        content="Bazen sadece yukarıdaki dünyayı merak ediyorum. Ama sonra evime, bu masalsı şatoya bakıyorum ve ne kadar şanslı olduğumu anlıyorum. Su altı sessizliği paha biçilemez.",
        image_url="/v2/assets/themes/ariel_post_castle.png",
        user_id=lorin.id
    )
    
    p2 = Post(
        title="Yeni Bir Başlangıç ✨",
        content="Kuyruğumdan vazgeçmek zorunda kalsam da, bu beyaz elbise ve bacaklar yeni bir maceranın habercisi! İnsanların dünyası gerçekten çok tuhaf ve büyüleyici.",
        image_url="/v2/assets/themes/ariel_post_white.png",
        user_id=lorin.id
    )

    db.session.add(p1)
    db.session.add(p2)
    db.session.commit()
    print("Ariel'in (Lorin) dünyası kuruldu! 🐚✨")
