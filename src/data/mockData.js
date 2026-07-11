export const categories = [
  { id: 1, nameEn: 'Women', nameAr: 'نسائي', slug: 'women', image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=600&q=80', count: 24 },
  { id: 2, nameEn: 'Men', nameAr: 'رجالي', slug: 'men', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80', count: 18 },
  { id: 3, nameEn: 'Kids', nameAr: 'أطفال', slug: 'kids', image: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=600&q=80', count: 12 },
  { id: 4, nameEn: 'Accessories', nameAr: 'إكسسوارات', slug: 'accessories', image: 'https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=600&q=80', count: 15 },
  { id: 5, nameEn: 'Shoes', nameAr: 'أحذية', slug: 'shoes', image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600&q=80', count: 10 },
  { id: 6, nameEn: 'Bags', nameAr: 'حقائب', slug: 'bags', image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80', count: 8 },
]

export const allProducts = [
  {
    id: 1, nameAr: 'فستان صيفي floral', nameEn: 'Floral Summer Dress', category: 'women', price: 350, sizes: ['S', 'M', 'L', 'XL'],
    colors: ['وردي', 'أبيض'], colorsEn: ['Pink', 'White'], image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&q=80', inStock: true,
    rating: 4.8, reviewCount: 124, discount: 15, descriptionEn: 'A beautiful floral summer dress perfect for warm days. Made from breathable cotton blend fabric with a flattering A-line silhouette.', descriptionAr: 'فستان صيفي جميل بنقشة زهور مثالي للأيام الدافئة. مصنوع من قماش قطني مريح بقصة A-line أنيقة.',
    images: ['https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&q=80', 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=600&q=80', 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600&q=80'],
    isFeatured: true, isNew: false, isBestSeller: true, brand: 'Elegance', sku: 'WD-001',
  },
  {
    id: 2, nameAr: 'بلوزة كتان', nameEn: 'Linen Blouse', category: 'women', price: 220, sizes: ['S', 'M', 'L'],
    colors: ['بيج', 'أزرق فاتح'], colorsEn: ['Beige', 'Light Blue'], image: 'https://images.unsplash.com/photo-1564257631407-3deb25e9fb7a?w=600&q=80', inStock: true,
    rating: 4.5, reviewCount: 89, discount: 0, descriptionEn: 'Elegant linen blouse with a relaxed fit. Perfect for both casual and semi-formal occasions.', descriptionAr: 'بلوزة كتان أنيقة بقصة مريحة. مثالية للمناسبات اليومية وشبه الرسمية.',
    images: ['https://images.unsplash.com/photo-1564257631407-3deb25e9fb7a?w=600&q=80', 'https://images.unsplash.com/photo-1551163943-3f6a855d1153?w=600&q=80'],
    isFeatured: true, isNew: true, isBestSeller: false, brand: 'Elegance', sku: 'WB-002',
  },
  {
    id: 3, nameAr: 'جينز wide leg', nameEn: 'Wide Leg Jeans', category: 'women', price: 280, sizes: ['S', 'M', 'L', 'XL'],
    colors: ['أزرق', 'أسود'], colorsEn: ['Blue', 'Black'], image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600&q=80', inStock: true,
    rating: 4.6, reviewCount: 156, discount: 10, descriptionEn: 'Trendy wide leg jeans with a high waist design. Comfortable stretch denim for all-day wear.', descriptionAr: 'جينز واسع الساق بتصميم خصر عالي. دنيم مطاط مريح للارتداء طوال اليوم.',
    images: ['https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600&q=80', 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&q=80'],
    isFeatured: false, isNew: false, isBestSeller: true, brand: 'DenimCo', sku: 'WJ-003',
  },
  {
    id: 4, nameAr: 'تيشيرت رجالي basic', nameEn: 'Men Basic T-Shirt', category: 'men', price: 150, sizes: ['M', 'L', 'XL', 'XXL'],
    colors: ['أسود', 'أبيض', 'رمادي'], colorsEn: ['Black', 'White', 'Gray'], image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80', inStock: true,
    rating: 4.3, reviewCount: 234, discount: 0, descriptionEn: 'Essential crew neck t-shirt made from premium cotton. A wardrobe staple for every man.', descriptionAr: 'تيشيرت أساسي برقبة دائرية من القطن الفاخر. قطعة أساسية في خزانة كل رجل.',
    images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80', 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=600&q=80'],
    isFeatured: false, isNew: false, isBestSeller: true, brand: 'BasicWear', sku: 'MT-004',
  },
  {
    id: 5, nameAr: 'قميص رجالي كاجوال', nameEn: 'Men Casual Shirt', category: 'men', price: 260, sizes: ['M', 'L', 'XL'],
    colors: ['أبيض', 'كحلي'], colorsEn: ['White', 'Navy'], image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600&q=80', inStock: true,
    rating: 4.7, reviewCount: 98, discount: 20, descriptionEn: 'Stylish casual shirt with a modern slim fit. Perfect for weekend outings and casual Fridays.', descriptionAr: 'قميص كاجوال أنيق بقصة سليم عصرية. مثالي للخروجات والمناسبات غير الرسمية.',
    images: ['https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600&q=80', 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&q=80'],
    isFeatured: true, isNew: false, isBestSeller: false, brand: 'UrbanStyle', sku: 'MS-005',
  },
  {
    id: 6, nameAr: 'طقم أطفال بنات', nameEn: 'Girls Kids Set', category: 'kids', price: 180, sizes: ['4Y', '6Y', '8Y', '10Y'],
    colors: ['زهري', 'أصفر'], colorsEn: ['Pink', 'Yellow'], image: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=600&q=80', inStock: true,
    rating: 4.9, reviewCount: 67, discount: 0, descriptionEn: 'Adorable matching set for girls. Comfortable and colorful design that kids love.', descriptionAr: 'طقم متناسق للبنات. تصميم مريح وملون يحبه الأطفال.',
    images: ['https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=600&q=80'],
    isFeatured: false, isNew: true, isBestSeller: false, brand: 'KidZone', sku: 'KS-006',
  },
  {
    id: 7, nameAr: 'جاكيت شتوي', nameEn: 'Winter Jacket', category: 'women', price: 450, sizes: ['S', 'M', 'L'],
    colors: ['أسود', 'بني'], colorsEn: ['Black', 'Brown'], image: 'https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=600&q=80', inStock: true,
    rating: 4.4, reviewCount: 45, discount: 25, descriptionEn: 'Warm and stylish winter jacket with premium insulation. Water-resistant outer shell.', descriptionAr: 'جاكيت شتوي دافئ وأنيق بعزل فاخر. طبقة خارجية مقاومة للماء.',
    images: ['https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=600&q=80', 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&q=80'],
    isFeatured: true, isNew: false, isBestSeller: false, brand: 'WinterEdge', sku: 'WJ-007',
  },
  {
    id: 8, nameAr: 'حذاء رياضي', nameEn: 'Sport Sneakers', category: 'men', price: 320, sizes: ['40', '41', '42', '43', '44'],
    colors: ['أبيض', 'أسود'], colorsEn: ['White', 'Black'], image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80', inStock: false,
    rating: 4.2, reviewCount: 178, discount: 0, descriptionEn: 'Lightweight sport sneakers with cushioned sole. Ideal for running and everyday active lifestyle.', descriptionAr: 'حذاء رياضي خفيف بنعل مبطن. مثالي للجري ونمط الحياة النشط.',
    images: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80', 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&q=80'],
    isFeatured: false, isNew: false, isBestSeller: true, brand: 'StepUp', sku: 'SH-008',
  },
  {
    id: 9, nameAr: 'فستان سهرة أسود', nameEn: 'Black Evening Dress', category: 'women', price: 650, sizes: ['S', 'M', 'L'],
    colors: ['أسود'], colorsEn: ['Black'], image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=600&q=80', inStock: true,
    rating: 4.9, reviewCount: 203, discount: 0, descriptionEn: 'Stunning black evening dress with elegant draping. Perfect for special occasions and formal events.', descriptionAr: 'فستان سهرة أسود مذهل بأقمشة منسدلة أنيقة. مثالي للمناسبات الخاصة والأحداث الرسمية.',
    images: ['https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=600&q=80', 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&q=80', 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=600&q=80'],
    isFeatured: true, isNew: true, isBestSeller: true, brand: 'Elegance', sku: 'WD-009',
  },
  {
    id: 10, nameAr: 'حقيبة يد جلدية', nameEn: 'Leather Handbag', category: 'accessories', price: 420, sizes: ['One Size'],
    colors: ['بني', 'أسود', 'بيج'], colorsEn: ['Brown', 'Black', 'Beige'], image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80', inStock: true,
    rating: 4.7, reviewCount: 89, discount: 10, descriptionEn: 'Genuine leather handbag with multiple compartments. Timeless design meets everyday functionality.', descriptionAr: 'حقيبة يد من الجلد الطبيعي بأقسام متعددة. تصميم كلاسيكي يجمع بين الأناقة والعملية.',
    images: ['https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80', 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&q=80'],
    isFeatured: true, isNew: false, isBestSeller: true, brand: 'LuxBag', sku: 'AC-010',
  },
  {
    id: 11, nameAr: 'بلوفر صوف', nameEn: 'Wool Sweater', category: 'women', price: 310, sizes: ['S', 'M', 'L', 'XL'],
    colors: ['كريمي', 'رمادي', 'وردي'], colorsEn: ['Cream', 'Gray', 'Pink'], image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&q=80', inStock: true,
    rating: 4.5, reviewCount: 56, discount: 0, descriptionEn: 'Cozy wool blend sweater with ribbed trim. Soft and warm for cold weather styling.', descriptionAr: 'بلوفر مزيج صوف مريح بحواف محبوكة. ناعم ودافئ لأيام الشتاء.',
    images: ['https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&q=80'],
    isFeatured: false, isNew: true, isBestSeller: false, brand: 'WinterEdge', sku: 'WS-011',
  },
  {
    id: 12, nameAr: 'بنطلون رجالي رسمي', nameEn: 'Men Formal Trousers', category: 'men', price: 340, sizes: ['30', '32', '34', '36'],
    colors: ['أسود', 'كحلي', 'رمادي'], colorsEn: ['Black', 'Navy', 'Gray'], image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&q=80', inStock: true,
    rating: 4.4, reviewCount: 112, discount: 15, descriptionEn: 'Classic formal trousers with a tailored fit. Wrinkle-resistant fabric for a polished look all day.', descriptionAr: 'بنطلون رسمي كلاسيكي بقصة مفصلة. قماش مقاوم للتجاعيد لمظهر أنيق طوال اليوم.',
    images: ['https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&q=80'],
    isFeatured: false, isNew: false, isBestSeller: true, brand: 'UrbanStyle', sku: 'MT-012',
  },
  {
    id: 13, nameAr: 'فستان أطفال حفلات', nameEn: 'Kids Party Dress', category: 'kids', price: 250, sizes: ['3Y', '4Y', '5Y', '6Y', '8Y'],
    colors: ['وردي', 'أبيض', 'أزرق فاتح'], colorsEn: ['Pink', 'White', 'Light Blue'], image: 'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=600&q=80', inStock: true,
    rating: 4.8, reviewCount: 34, discount: 0, descriptionEn: 'Adorable party dress for little princesses. Tulle skirt with satin bodice and bow detail.', descriptionAr: 'فستان حفلات رائع للأميرات الصغيرات. تنورة تول مع صدر ساتان وتفاصيل فيونكة.',
    images: ['https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=600&q=80'],
    isFeatured: false, isNew: true, isBestSeller: false, brand: 'KidZone', sku: 'KD-013',
  },
  {
    id: 14, nameAr: 'نظارة شمسية', nameEn: 'Sunglasses', category: 'accessories', price: 180, sizes: ['One Size'],
    colors: ['أسود', 'بني'], colorsEn: ['Black', 'Brown'], image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600&q=80', inStock: true,
    rating: 4.3, reviewCount: 67, discount: 20, descriptionEn: 'UV-protected polarized sunglasses with a modern cat-eye frame. Lightweight and comfortable.', descriptionAr: 'نظارات شمسية مستقطبة بحماية UV وإطار كات آي عصري. خفيفة ومريحة.',
    images: ['https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600&q=80'],
    isFeatured: false, isNew: false, isBestSeller: false, brand: 'VisionPlus', sku: 'AC-014',
  },
  {
    id: 15, nameAr: 'حذاء كعب عالي', nameEn: 'High Heel Shoes', category: 'shoes', price: 380, sizes: ['36', '37', '38', '39', '40'],
    colors: ['أسود', 'أحمر', 'بيج'], colorsEn: ['Black', 'Red', 'Beige'], image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600&q=80', inStock: true,
    rating: 4.6, reviewCount: 145, discount: 0, descriptionEn: 'Elegant high heel shoes with a pointed toe. Premium leather upper with cushioned insole.', descriptionAr: 'حذاء كعب عالي أنيق بمقدمة مدببة. جلد فاخر مع نعل داخلي مبطن.',
    images: ['https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600&q=80'],
    isFeatured: true, isNew: false, isBestSeller: true, brand: 'StepUp', sku: 'SH-015',
  },
  {
    id: 16, nameAr: 'ساعة يد نسائية', nameEn: 'Women Watch', category: 'accessories', price: 520, sizes: ['One Size'],
    colors: ['ذهبي', 'فضي', 'ذهبي وردي'], colorsEn: ['Gold', 'Silver', 'Rose Gold'], image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=600&q=80', inStock: true,
    rating: 4.8, reviewCount: 78, discount: 10, descriptionEn: 'Elegant women watch with a minimalist dial. Stainless steel band with a secure clasp.', descriptionAr: 'ساعة يد نسائية أنيقة بتصميم بسيط. سوار ستانلس ستيل بقفل آمن.',
    images: ['https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=600&q=80'],
    isFeatured: true, isNew: true, isBestSeller: false, brand: 'TimeLux', sku: 'AC-016',
  },
]

export const testimonials = [
  { id: 1, nameEn: 'Sarah Ahmed', nameAr: 'سارة أحمد', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80', rating: 5, textEn: 'Amazing quality and fast delivery! The dress fits perfectly and the fabric is luxurious.', textAr: 'جودة مذهلة وتوصيل سريع! الفستان مقاسه مظبوط والقماش فاخر.', date: '2025-06-15' },
  { id: 2, nameEn: 'Nour Hassan', nameAr: 'نور حسن', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80', rating: 5, textEn: 'Best online fashion store in Egypt! Customer service is exceptional.', textAr: 'أفضل متجر أزياء أونلاين في مصر! خدمة العملاء ممتازة.', date: '2025-05-20' },
  { id: 3, nameEn: 'Mona Ali', nameAr: 'منى علي', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80', rating: 4, textEn: 'Love the variety of styles. The winter jacket exceeded my expectations!', textAr: 'بحب تنوع الستايلات. الجاكيت الشتوي فاق توقعاتي!', date: '2025-04-10' },
  { id: 4, nameEn: 'Fatma Ibrahim', nameAr: 'فاطمة إبراهيم', avatar: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=100&q=80', rating: 5, textEn: 'Ordered for my daughter and she loves it! Great kids collection.', textAr: 'طلبت لبنتي وعجبها جداً! مجموعة أطفال رائعة.', date: '2025-03-25' },
]

export const instagramPosts = [
  { id: 1, image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&q=80', likes: 234 },
  { id: 2, image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=400&q=80', likes: 189 },
  { id: 3, image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=400&q=80', likes: 312 },
  { id: 4, image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=400&q=80', likes: 267 },
  { id: 5, image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&q=80', likes: 198 },
  { id: 6, image: 'https://images.unsplash.com/photo-1581044777550-4cfa60707998?w=400&q=80', likes: 156 },
]

export const orders = [
  { id: 'ORD-001', customerName: 'Sarah Ahmed', customerNameAr: 'سارة أحمد', email: 'sara@email.com', phone: '01012345678', date: '2025-07-01', status: 'delivered', total: 680, items: [{ name: 'Floral Summer Dress', qty: 1, price: 350 }, { name: 'Linen Blouse', qty: 1, price: 220 }], address: 'Cairo, Egypt', paymentMethod: 'COD' },
  { id: 'ORD-002', customerName: 'Ahmed Mohamed', customerNameAr: 'أحمد محمد', email: 'ahmed@email.com', phone: '01123456789', date: '2025-07-02', status: 'shipped', total: 410, items: [{ name: 'Men Basic T-Shirt', qty: 1, price: 150 }, { name: 'Men Casual Shirt', qty: 1, price: 260 }], address: 'Giza, Egypt', paymentMethod: 'COD' },
  { id: 'ORD-003', customerName: 'Nour Hassan', customerNameAr: 'نور حسن', email: 'nour@email.com', phone: '01234567890', date: '2025-07-03', status: 'processing', total: 450, items: [{ name: 'Winter Jacket', qty: 1, price: 450 }], address: 'Alexandria, Egypt', paymentMethod: 'COD' },
  { id: 'ORD-004', customerName: 'Mona Ali', customerNameAr: 'منى علي', email: 'mona@email.com', phone: '01098765432', date: '2025-07-04', status: 'pending', total: 830, items: [{ name: 'Black Evening Dress', qty: 1, price: 650 }, { name: 'Girls Kids Set', qty: 1, price: 180 }], address: 'Mansoura, Egypt', paymentMethod: 'COD' },
  { id: 'ORD-005', customerName: 'Fatma Ibrahim', customerNameAr: 'فاطمة إبراهيم', email: 'fatma@email.com', phone: '01187654321', date: '2025-07-05', status: 'delivered', total: 560, items: [{ name: 'Wide Leg Jeans', qty: 2, price: 280 }], address: 'Tanta, Egypt', paymentMethod: 'COD' },
  { id: 'ORD-006', customerName: 'Hana Youssef', customerNameAr: 'هنا يوسف', email: 'hana@email.com', phone: '01076543210', date: '2025-07-06', status: 'cancelled', total: 320, items: [{ name: 'Sport Sneakers', qty: 1, price: 320 }], address: 'Assiut, Egypt', paymentMethod: 'COD' },
  { id: 'ORD-007', customerName: 'Omar Khaled', customerNameAr: 'عمر خالد', email: 'omar@email.com', phone: '01265432109', date: '2025-07-07', status: 'processing', total: 760, items: [{ name: 'Leather Handbag', qty: 1, price: 420 }, { name: 'Men Formal Trousers', qty: 1, price: 340 }], address: 'Sohag, Egypt', paymentMethod: 'COD' },
  { id: 'ORD-008', customerName: 'Layla Samir', customerNameAr: 'ليلى سمير', email: 'layla@email.com', phone: '01154321098', date: '2025-07-08', status: 'shipped', total: 900, items: [{ name: 'High Heel Shoes', qty: 1, price: 380 }, { name: 'Women Watch', qty: 1, price: 520 }], address: 'Luxor, Egypt', paymentMethod: 'COD' },
]

export const customers = [
  { id: 1, name: 'Sarah Ahmed', nameAr: 'سارة أحمد', email: 'sara@email.com', phone: '01012345678', orders: 5, totalSpent: 2340, joinDate: '2025-01-15', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80' },
  { id: 2, name: 'Ahmed Mohamed', nameAr: 'أحمد محمد', email: 'ahmed@email.com', phone: '01123456789', orders: 3, totalSpent: 1250, joinDate: '2025-02-20', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80' },
  { id: 3, name: 'Nour Hassan', nameAr: 'نور حسن', email: 'nour@email.com', phone: '01234567890', orders: 8, totalSpent: 4560, joinDate: '2024-11-10', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80' },
  { id: 4, name: 'Mona Ali', nameAr: 'منى علي', email: 'mona@email.com', phone: '01098765432', orders: 2, totalSpent: 830, joinDate: '2025-04-05', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80' },
  { id: 5, name: 'Fatma Ibrahim', nameAr: 'فاطمة إبراهيم', email: 'fatma@email.com', phone: '01187654321', orders: 6, totalSpent: 3120, joinDate: '2025-01-02', avatar: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=100&q=80' },
  { id: 6, name: 'Omar Khaled', nameAr: 'عمر خالد', email: 'omar@email.com', phone: '01265432109', orders: 4, totalSpent: 1890, joinDate: '2025-03-18', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80' },
]

export const messages = [
  { id: 1, name: 'Sarah Ahmed', email: 'sara@email.com', subject: 'Order inquiry', subjectAr: 'استفسار عن طلب', message: 'Hi, I wanted to ask about my order status. It has been 3 days.', messageAr: 'مرحبا، أريد الاستفسار عن حالة طلبي. مر 3 أيام.', date: '2025-07-08', read: false },
  { id: 2, name: 'Ahmed Mohamed', email: 'ahmed@email.com', subject: 'Return request', subjectAr: 'طلب إرجاع', message: 'I would like to return the t-shirt I ordered. Wrong size.', messageAr: 'أريد إرجاع التيشيرت اللي طلبته. المقاس غلط.', date: '2025-07-07', read: true },
  { id: 3, name: 'Nour Hassan', email: 'nour@email.com', subject: 'Product availability', subjectAr: 'توفر منتج', message: 'When will the sport sneakers be back in stock?', messageAr: 'امتى الحذاء الرياضي هيرجع متوفر؟', date: '2025-07-06', read: false },
  { id: 4, name: 'Layla Samir', email: 'layla@email.com', subject: 'Bulk order', subjectAr: 'طلب بالجملة', message: 'I am interested in placing a bulk order for my boutique.', messageAr: 'أنا مهتمة بعمل طلب بالجملة لبوتيكي.', date: '2025-07-05', read: true },
  { id: 5, name: 'Hana Youssef', email: 'hana@email.com', subject: 'Great service!', subjectAr: 'خدمة ممتازة!', message: 'Just wanted to say thank you for the amazing service!', messageAr: 'بس حبيت أشكركم على الخدمة الممتازة!', date: '2025-07-04', read: true },
]

export const bookings = [
  { id: 1, customerName: 'Sarah Ahmed', customerNameAr: 'سارة أحمد', date: '2025-07-15', time: '10:00 AM', service: 'Personal Styling', serviceAr: 'تنسيق ملابس شخصي', status: 'confirmed', phone: '01012345678' },
  { id: 2, customerName: 'Nour Hassan', customerNameAr: 'نور حسن', date: '2025-07-16', time: '2:00 PM', service: 'Wardrobe Consultation', serviceAr: 'استشارة خزانة ملابس', status: 'pending', phone: '01234567890' },
  { id: 3, customerName: 'Mona Ali', customerNameAr: 'منى علي', date: '2025-07-17', time: '11:00 AM', service: 'Personal Shopping', serviceAr: 'تسوق شخصي', status: 'confirmed', phone: '01098765432' },
  { id: 4, customerName: 'Fatma Ibrahim', customerNameAr: 'فاطمة إبراهيم', date: '2025-07-18', time: '3:00 PM', service: 'Fitting Session', serviceAr: 'جلسة قياس', status: 'cancelled', phone: '01187654321' },
  { id: 5, customerName: 'Hana Youssef', customerNameAr: 'هنا يوسف', date: '2025-07-20', time: '10:00 AM', service: 'Personal Styling', serviceAr: 'تنسيق ملابس شخصي', status: 'pending', phone: '01076543210' },
]

export const dashboardStats = {
  totalRevenue: 45230,
  totalOrders: 156,
  totalCustomers: 89,
  totalProducts: 16,
  revenueChange: 12.5,
  ordersChange: 8.3,
  customersChange: 15.2,
  productsChange: 4.1,
  monthlySales: [
    { month: 'Jan', sales: 4200 },
    { month: 'Feb', sales: 3800 },
    { month: 'Mar', sales: 5100 },
    { month: 'Apr', sales: 4600 },
    { month: 'May', sales: 5800 },
    { month: 'Jun', sales: 6200 },
    { month: 'Jul', sales: 7500 },
  ],
  categoryDistribution: [
    { category: 'Women', percentage: 45 },
    { category: 'Men', percentage: 25 },
    { category: 'Kids', percentage: 12 },
    { category: 'Accessories', percentage: 10 },
    { category: 'Shoes', percentage: 8 },
  ],
  recentActivity: [
    { id: 1, action: 'New order', description: 'Order #ORD-008 placed by Layla Samir', time: '2 hours ago' },
    { id: 2, action: 'Product updated', description: 'Winter Jacket price updated', time: '4 hours ago' },
    { id: 3, action: 'New customer', description: 'Hana Youssef registered', time: '6 hours ago' },
    { id: 4, action: 'Order shipped', description: 'Order #ORD-002 marked as shipped', time: '8 hours ago' },
    { id: 5, action: 'New review', description: '5-star review on Black Evening Dress', time: '1 day ago' },
  ],
}

export const userProfile = {
  name: 'Sarah Ahmed',
  nameAr: 'سارة أحمد',
  email: 'sara@email.com',
  phone: '01012345678',
  avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80',
  address: '15 Tahrir Street, Downtown',
  addressAr: '15 شارع التحرير، وسط البلد',
  city: 'Cairo',
  cityAr: 'القاهرة',
  joinDate: '2025-01-15',
  wishlist: [1, 9, 10, 15],
  orderHistory: ['ORD-001', 'ORD-004'],
}

export function getLocalizedField(item, field, lang) {
  if (lang === 'ar') {
    return item[`${field}Ar`] || item[field] || ''
  }
  return item[`${field}En`] || item[field] || ''
}
