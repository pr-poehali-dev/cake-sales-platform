import { useState } from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import Icon from '@/components/ui/icon';

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  category: 'desserts' | 'meat';
}

interface CartItem extends Product {
  quantity: number;
}

const products: Product[] = [
  {
    id: 1,
    name: 'Шоколадный вихрь',
    price: 2500,
    description: 'Нежный шоколадный торт с кремом из кешью и какао',
    image: 'https://cdn.poehali.dev/projects/6c4cef6e-3f0c-4613-8a3b-b439a9576d0a/files/c56e6950-f13e-4ae3-b96b-94842aedfdb3.jpg',
    category: 'desserts'
  },
  {
    id: 2,
    name: 'Малиновая медитация',
    price: 2800,
    description: 'Воздушный бисквит с малиновым муссом и фисташками',
    image: 'https://cdn.poehali.dev/projects/6c4cef6e-3f0c-4613-8a3b-b439a9576d0a/files/5ec246e2-193e-4ba1-8505-dc6ede7d9065.jpg',
    category: 'desserts'
  },
  {
    id: 3,
    name: 'Лимонное просветление',
    price: 2400,
    description: 'Освежающий лимонный торт с кокосовым кремом',
    image: 'https://cdn.poehali.dev/projects/6c4cef6e-3f0c-4613-8a3b-b439a9576d0a/files/5f878890-9a50-43d1-aae0-e66529ff4288.jpg',
    category: 'desserts'
  },
  {
    id: 4,
    name: 'Ягодное вращение',
    price: 3000,
    description: 'Ассорти из лесных ягод с ванильным кремом',
    image: 'https://cdn.poehali.dev/projects/6c4cef6e-3f0c-4613-8a3b-b439a9576d0a/files/5ec246e2-193e-4ba1-8505-dc6ede7d9065.jpg',
    category: 'desserts'
  },
  {
    id: 5,
    name: 'Манго сансара',
    price: 2900,
    description: 'Тропический торт с манго и маракуйей',
    image: 'https://cdn.poehali.dev/projects/6c4cef6e-3f0c-4613-8a3b-b439a9576d0a/files/5f878890-9a50-43d1-aae0-e66529ff4288.jpg',
    category: 'desserts'
  },
  {
    id: 6,
    name: 'Фисташковый танец',
    price: 3200,
    description: 'Изысканный торт с фисташковым кремом и розой',
    image: 'https://cdn.poehali.dev/projects/6c4cef6e-3f0c-4613-8a3b-b439a9576d0a/files/c56e6950-f13e-4ae3-b96b-94842aedfdb3.jpg',
    category: 'desserts'
  },
  {
    id: 7,
    name: 'Пельмени',
    price: 450,
    description: 'Сочные веганские пельмени с растительным мясом',
    image: '/placeholder.svg',
    category: 'meat'
  },
  {
    id: 8,
    name: 'Фарш',
    price: 380,
    description: 'Растительный фарш для любых блюд',
    image: '/placeholder.svg',
    category: 'meat'
  }
];

export default function Index() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [currentSection, setCurrentSection] = useState('desserts');

  const addToCart = (product: Product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: number, change: number) => {
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };

  const getTotalPrice = () => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const getTotalItems = () => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  };

  const filteredProducts = products.filter(p => p.category === currentSection);

  return (
    <div className="min-h-screen bg-background">
      <nav className="sticky top-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src="https://cdn.poehali.dev/files/cf0924be-28ae-4dfb-a9cc-e6d7222a6280.png" alt="ishq logo" className="w-12 h-12 object-contain" />
              <h1 className="text-3xl font-bold text-primary" style={{ fontFamily: "'Eagle Lake', cursive" }}>ishq</h1>
            </div>

            <div className="flex items-center gap-6">
              <div className="hidden md:flex items-center gap-6">
                <button
                  onClick={() => setCurrentSection('desserts')}
                  className={`text-sm font-medium transition-colors ${
                    currentSection === 'desserts' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  Десерты
                </button>
                <button
                  onClick={() => setCurrentSection('meat')}
                  className={`text-sm font-medium transition-colors ${
                    currentSection === 'meat' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  Растительное мясо
                </button>
                <button
                  onClick={() => setCurrentSection('about')}
                  className={`text-sm font-medium transition-colors ${
                    currentSection === 'about' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  О нас и доставка
                </button>
              </div>

              <div className="hidden md:flex flex-col items-end text-sm mr-4">
                <a href="tel:+74951234567" className="text-muted-foreground hover:text-foreground transition-colors">
                  +7 (495) 123-45-67
                </a>
                <a href="mailto:hello@ishq.ru" className="text-muted-foreground hover:text-foreground transition-colors">
                  hello@ishq.ru
                </a>
              </div>

              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon" className="relative">
                  <Icon name="ShoppingCart" size={20} />
                  {getTotalItems() > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
                      {getTotalItems()}
                    </Badge>
                  )}
                </Button>
                </SheetTrigger>
                <SheetContent className="w-full sm:max-w-lg">
                <SheetHeader>
                  <SheetTitle>Корзина</SheetTitle>
                </SheetHeader>
                <div className="mt-8 space-y-4">
                  {cart.length === 0 ? (
                    <p className="text-center text-muted-foreground py-8">Корзина пуста</p>
                  ) : (
                    <>
                      {cart.map(item => (
                        <div key={item.id} className="flex gap-4 p-4 bg-accent/50 rounded-lg">
                          <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
                          <div className="flex-1">
                            <h4 className="font-semibold">{item.name}</h4>
                            <p className="text-sm text-muted-foreground">{item.price} ₽</p>
                            <div className="flex items-center gap-2 mt-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => updateQuantity(item.id, -1)}
                              >
                                <Icon name="Minus" size={14} />
                              </Button>
                              <span className="text-sm font-medium w-8 text-center">{item.quantity}</span>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => updateQuantity(item.id, 1)}
                              >
                                <Icon name="Plus" size={14} />
                              </Button>
                            </div>
                          </div>
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => removeFromCart(item.id)}
                          >
                            <Icon name="X" size={18} />
                          </Button>
                        </div>
                      ))}
                      <div className="border-t pt-4 space-y-2">
                        <div className="flex justify-between text-lg font-semibold">
                          <span>Итого:</span>
                          <span>{getTotalPrice()} ₽</span>
                        </div>
                        <Button className="w-full" size="lg">
                          Оформить заказ
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>

      {(currentSection === 'desserts' || currentSection === 'meat') && (
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12 space-y-4">
              <div className="w-64 h-64 mx-auto flex items-center justify-center mb-8">
                <img src="https://cdn.poehali.dev/files/cf0924be-28ae-4dfb-a9cc-e6d7222a6280.png" alt="ishq logo" className="w-full h-full object-contain" />
              </div>
              <h2 className="text-5xl font-bold">{currentSection === 'desserts' ? 'Десерты' : 'Растительное мясо'}</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                {currentSection === 'desserts' 
                  ? 'Веганские торты, созданные с любовью и вдохновением' 
                  : 'Полезная альтернатива мясу на растительной основе'}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product, index) => (
                <Card key={product.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="relative overflow-hidden group">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                      index % 2 === 0 ? 'spin-slow' : 'spin-reverse'
                    }`}></div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-2xl font-semibold mb-2">{product.name}</h3>
                    <p className="text-muted-foreground mb-4">{product.description}</p>
                    <p className="text-2xl font-bold text-primary">{product.price} ₽</p>
                  </CardContent>
                  <CardFooter className="p-6 pt-0">
                    <Button onClick={() => addToCart(product)} className="w-full">
                      <Icon name="ShoppingCart" size={18} className="mr-2" />
                      В корзину
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {currentSection === 'about' && (
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto space-y-16">
              <div className="text-center space-y-6">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center float mx-auto mb-6">
                  <Icon name="Heart" size={32} className="text-primary" />
                </div>
                <h2 className="text-4xl font-bold">О нас</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  ishq — это любовь к жизни, выраженная через веганскую кондитерскую. Мы верим, что десерты могут быть вкусными, красивыми и этичными одновременно. Каждый торт создаётся вручную с использованием только растительных ингредиентов высочайшего качества.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Вдохновлённые суфийскими традициями кружения, мы вкладываем в каждое изделие медитативную энергию и любовь.
                </p>
              </div>

              <div className="border-t pt-16">
                <h2 className="text-4xl font-bold text-center mb-12">Доставка</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="p-6">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                      <Icon name="Truck" size={24} className="text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Курьерская доставка</h3>
                    <p className="text-muted-foreground">По Москве — 400 ₽. Бесплатно при заказе от 5000 ₽</p>
                  </Card>
                  <Card className="p-6">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                      <Icon name="Clock" size={24} className="text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Время доставки</h3>
                    <p className="text-muted-foreground">В день заказа или на следующий день с 10:00 до 22:00</p>
                  </Card>
                  <Card className="p-6">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                      <Icon name="MapPin" size={24} className="text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Самовывоз</h3>
                    <p className="text-muted-foreground">Бесплатно из нашей кондитерской на ул. Цветочная, 25</p>
                  </Card>
                  <Card className="p-6">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                      <Icon name="Package" size={24} className="text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Упаковка</h3>
                    <p className="text-muted-foreground">Каждый торт упаковывается в экологичную коробку</p>
                  </Card>
                </div>
              </div>

              <div className="border-t pt-16 text-center">
                <h2 className="text-4xl font-bold mb-12">Контакты</h2>
                <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Icon name="Phone" size={24} className="text-primary" />
                    </div>
                    <div className="text-left">
                      <p className="text-sm text-muted-foreground">Телефон</p>
                      <p className="text-lg font-semibold">+7 (495) 123-45-67</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Icon name="Mail" size={24} className="text-primary" />
                    </div>
                    <div className="text-left">
                      <p className="text-sm text-muted-foreground">Email</p>
                      <p className="text-lg font-semibold">hello@ishq.ru</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Icon name="MapPin" size={24} className="text-primary" />
                    </div>
                    <div className="text-left">
                      <p className="text-sm text-muted-foreground">Адрес</p>
                      <p className="text-lg font-semibold">Москва, ул. Цветочная, 25</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Icon name="Instagram" size={24} className="text-primary" />
                    </div>
                    <div className="text-left">
                      <p className="text-sm text-muted-foreground">Instagram</p>
                      <p className="text-lg font-semibold">@ishq_cakes</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      <footer className="border-t mt-20 py-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <div className="flex items-center justify-center gap-2 mb-2">
            <img src="https://cdn.poehali.dev/files/cf0924be-28ae-4dfb-a9cc-e6d7222a6280.png" alt="ishq logo" className="w-6 h-6 object-contain" />
            <span className="font-semibold text-foreground" style={{ fontFamily: "'Eagle Lake', cursive" }}>ishq</span>
          </div>
          <p className="text-sm">Веганские торты с любовью © 2024</p>
        </div>
      </footer>
    </div>
  );
}