
const mongoose = require('mongoose');
const uuid = require('uuid');

const UserSchema = new mongoose.Schema(
    {
        userID: {
            type: String,
            required: true,
            default: uuid.v4,
        },

        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
        },

        password: {
            type: String,
            required: true,
        },

        role: {
            type: String,
            enum: ['user', 'admin'],
            default: 'user',
            required: true,
        },

        // Legacy password recovery fields.
        // Keep until the new email OTP flow is fully tested.
        resetCode: {
            type: String,
            default: null,
        },

        securityPin: {
            type: String,
            default: null,
        },


        // =====================================================
        // SECURITY PIN PASSWORD RESET TOKEN
        // Valid for 10 minutes after PIN verification.
        // =====================================================

        passwordResetPinTokenHash: {
            type: String,
            default: null,
        },

        passwordResetPinTokenExpiresAt: {
            type: Date,
            default: null,
        },


        // =====================================================
        // FORGOT PASSWORD EMAIL OTP
        // =====================================================

        passwordResetOtp: {
            codeHash: {
                type: String,
                default: null,
            },

            expiresAt: {
                type: Date,
                default: null,
            },

            attempts: {
                type: Number,
                default: 0,
                min: 0,
            },

            lastSentAt: {
                type: Date,
                default: null,
            },
        },

        // =====================================================
        // EMAIL VERIFICATION (FUTURE FEATURE)
        //
        // Verification will not be enforced until enabled
        // in the backend authentication and registration flow.
        // =====================================================

        emailVerified: {
            type: Boolean,
            default: false,
        },

        emailVerificationOtp: {
            codeHash: {
                type: String,
                default: null,
            },

            expiresAt: {
                type: Date,
                default: null,
            },

            attempts: {
                type: Number,
                default: 0,
                min: 0,
            },

            lastSentAt: {
                type: Date,
                default: null,
            },
        },

        firstName: {
            type: String,
            required: true,
            trim: true,
        },

        lastName: {
            type: String,
            required: true,
            trim: true,
        },

        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
        },

        phoneNumber: {
            type: String,
            required: true,
            trim: true,
        },

        companyName: {
            type: String,
            required: true,
            trim: true,
        },

        country: {
            type: String,
            required: true,
            trim: true,
        },

        // =====================================================
        // NORMAL LOGIN SESSIONS
        //
        // Valid for 12 hours.
        // =====================================================

        sessions: [
            {
                sessionID: {
                    type: String,
                    required: true,
                },

                createdAt: {
                    type: Date,
                    default: Date.now,
                },

                expiresAt: {
                    type: Date,
                    default: () =>
                        Date.now() + 1000 * 60 * 60 * 12,
                },
            },
        ],

        // =====================================================
        // REMEMBERED LOGIN TOKENS
        //
        // Used by "Continue as <username>".
        //
        // IMPORTANT:
        // We never store the raw remember token in MongoDB.
        // Only its SHA-256 hash is stored.
        //
        // Valid for 30 days.
        // =====================================================

        rememberTokens: [
            {
                tokenHash: {
                    type: String,
                    required: true,
                },

                createdAt: {
                    type: Date,
                    default: Date.now,
                },

                expiresAt: {
                    type: Date,
                    default: () =>
                        Date.now() +
                        1000 * 60 * 60 * 24 * 30,
                },
            },
        ],
    },
    {
        timestamps: true,
    }
);

const User =
    mongoose.models.User ||
    mongoose.model('User', UserSchema);

module.exports = User;
