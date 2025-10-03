function route1(app){

    //Login , register, profile

    app.post('/register', async (req, res) => {
    const { email, password, role } = req.body; // Lấy dữ liệu từ request

    const hashedPassword = await bcrypt.hash(password, 10); // Mã hóa mật khẩu

    try {
        const user = await prisma.user.create({
        data: {
            email,
            password: hashedPassword,
            role: role || 'User'  // Nếu không có role, mặc định là User
        }
        });

        res.json({
        message: 'User created',
        user: { id: user.id, email: user.email, role: user.role }
        });
    } catch (err) {
        res.status(400).json({ error: 'Email already exists' }); // Nếu email đã tồn tại
    }
    });

    app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } }); // Tìm người dùng theo email

    if (!user) return res.status(401).json({ error: 'Invalid credentials' });

    const match = await bcrypt.compare(password, user.password); // So sánh mật khẩu

    if (!match) return res.status(401).json({ error: 'Invalid credentials' });

    const token = jwt.sign(
        { userId: user.id, role: user.role }, 
        JWT_SECRET, 
        { expiresIn: '1h' }
    );

    res.json({ token }); // Trả về JWT token
    });

    app.get('/profile', authenticateToken, async (req, res) => {
    const user = await prisma.user.findUnique({
        where: { id: req.user.userId }
    });
    res.json({ user });
    });


    app.get('/admin', authenticateToken, authorizeRole('Admin'), (req, res) => {
    res.json({ message: 'Welcome Admin!' });
    });

}

module.exports = route1;