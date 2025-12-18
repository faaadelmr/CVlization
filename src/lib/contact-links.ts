/**
 * Generates a mailto: link for email addresses
 */
export function getMailtoLink(email: string): string {
    if (!email) return '';
    return `mailto:${email}`;
}

/**
 * Formats a phone number for WhatsApp link
 * Removes all non-numeric characters except leading +
 */
export function formatPhoneForWhatsApp(phone: string): string {
    if (!phone) return '';

    // Remove all characters except digits and leading +
    let formatted = phone.replace(/[^\d+]/g, '');

    // If starts with +, keep it and remove any other + signs
    if (formatted.startsWith('+')) {
        formatted = '+' + formatted.slice(1).replace(/\+/g, '');
    } else {
        formatted = formatted.replace(/\+/g, '');
    }

    // Remove leading + for wa.me link (it handles country code automatically)
    if (formatted.startsWith('+')) {
        formatted = formatted.slice(1);
    }

    // Handle common Indonesian number formats
    // 08xxx -> 628xxx
    if (formatted.startsWith('08')) {
        formatted = '62' + formatted.slice(1);
    }
    // 8xxx (without 0) -> 628xxx
    else if (formatted.startsWith('8') && formatted.length >= 10 && formatted.length <= 13) {
        formatted = '62' + formatted;
    }

    return formatted;
}

/**
 * Generates a WhatsApp link for phone numbers
 */
export function getWhatsAppLink(phone: string): string {
    if (!phone) return '';
    const formattedPhone = formatPhoneForWhatsApp(phone);
    return `https://wa.me/${formattedPhone}`;
}

/**
 * Generates a tel: link for phone numbers
 */
export function getTelLink(phone: string): string {
    if (!phone) return '';
    const formatted = phone.replace(/[^\d+]/g, '');
    return `tel:${formatted}`;
}

/**
 * Ensures a website URL has the https:// protocol
 */
export function getWebsiteLink(website: string): string {
    if (!website) return '';
    if (website.startsWith('http://') || website.startsWith('https://')) {
        return website;
    }
    return `https://${website}`;
}
