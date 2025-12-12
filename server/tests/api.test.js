import { jest } from '@jest/globals';
import request from 'supertest';
import bcrypt from 'bcrypt';

// Mock Mongoose Models
// We must mock these BEFORE importing app because app imports them at top level
jest.unstable_mockModule('mongoose', () => ({
    default: {
        connect: jest.fn(),
        Schema: class { },
        model: jest.fn(),
    }
}));

jest.unstable_mockModule('../models/UserModel.js', () => ({
    default: {
        findOne: jest.fn(),
        save: jest.fn(),
    }
}));

// We also need to mock other models to prevent DB connection attempts or errors during app load if they do side effects
jest.unstable_mockModule('../models/Posts.js', () => ({ default: {} }));
jest.unstable_mockModule('../models/Product.js', () => ({ default: {} }));
jest.unstable_mockModule('../models/Cart.js', () => ({ default: {} }));

// Import the app dynamically after mocks are set up
const { app } = await import('../index.js');
const UserModel = (await import('../models/UserModel.js')).default;

describe('POST /login', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should return 200 and user data for valid credentials', async () => {
        const mockUser = {
            email: 'test@example.com',
            password: await bcrypt.hash('password123', 10),
            uname: 'Test User'
        };

        UserModel.findOne.mockResolvedValue(mockUser);

        const res = await request(app)
            .post('/login')
            .send({ email: 'test@example.com', password: 'password123' });

        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe("Success");
        expect(res.body.user.email).toBe(mockUser.email);
    });

    it('should return 401 for invalid password', async () => {
        const mockUser = {
            email: 'test@example.com',
            password: await bcrypt.hash('password123', 10),
        };

        UserModel.findOne.mockResolvedValue(mockUser);

        const res = await request(app)
            .post('/login')
            .send({ email: 'test@example.com', password: 'wrongpassword' });

        expect(res.statusCode).toBe(401);
        expect(res.body.message).toBe("Invalid Credentials..");
    });

    it('should return 404 if user not found', async () => {
        UserModel.findOne.mockResolvedValue(null);

        const res = await request(app)
            .post('/login')
            .send({ email: 'nonexistent@example.com', password: 'password123' });

        expect(res.statusCode).toBe(404);
        expect(res.body.message).toBe("User not found...");
    });
});
