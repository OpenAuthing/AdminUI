const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
export function generate(length = 8) {
    let retVal = '';
    for (let i = 0; i < length; i++) {
        retVal += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    return retVal;
}

export const Requirements = [
    {
        re: /[0-9]/,
        label: 'Includes number',
        message: 'Password must include at least one number',
    },
    {
        re: /[a-z]/,
        label: 'Includes lowercase letter',
        message: 'Password must include at least one lowercase letter',
    },
    {
        re: /[A-Z]/,
        label: 'Includes uppercase letter',
        message: 'Password must include at least one uppercase letter',
    },
];

export function getStrength(password: string) {
    let multiplier = password.length > 5 ? 0 : 1;

    Requirements.forEach((requirement) => {
        if (!requirement.re.test(password)) {
            multiplier += 1;
        }
    });

    return Math.max(100 - (100 / (Requirements.length + 1)) * multiplier, 10);
}

export function validate(password?: string) {
    if (password === undefined || password === '') {
        return 'Password is required';
    }
    for (var requirement of Requirements) {
        if (!requirement.re.test(password ?? '')) {
            return requirement.message;
        }
    }

    return null;
}
