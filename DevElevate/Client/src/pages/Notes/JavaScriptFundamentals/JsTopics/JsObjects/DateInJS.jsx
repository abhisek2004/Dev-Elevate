import CodeBlock from "../../components/CodeBlock";

const DateInJS = () => {
    const examples = [
        {
            title: 'Creating Date Objects',
            code: `// Current date and time
const now = new Date();
console.log(now); // e.g., Thu Sep 10 2025 17:40:00 GMT+0530

// Specific date and time
const specificDate = new Date('2025-09-10T12:00:00');
console.log(specificDate);

// Using year, month (0-11), day, hours, minutes, seconds
const date1 = new Date(2025, 8, 10, 12, 30, 0); // Note: months are 0-indexed
console.log(date1); // Thu Sep 10 2025 12:30:00 GMT+0530

// Timestamp (milliseconds since Unix Epoch)
const timestampDate = new Date(1631280000000);
console.log(timestampDate);`,
            explanation: 'The Date object can be created in several ways. The most common is using `new Date()` for the current date and time. You can also create dates from strings or individual date/time components.'
        },
        {
            title: 'Getting Date Components',
            code: `const date = new Date();

// Get components
const year = date.getFullYear();    // 2025
const month = date.getMonth();     // 8 (0-11, September is 8)
const day = date.getDate();        // 10 (day of month)
const hours = date.getHours();     // 17 (0-23)
const minutes = date.getMinutes(); // 40 (0-59)
const seconds = date.getSeconds(); // 0-59
const dayOfWeek = date.getDay();   // 3 (0-6, Sunday=0)

console.log(\`\${day}/\${month + 1}/\${year} \${hours}:\${minutes}\`);
// e.g., 10/9/2025 17:40`,
            explanation: 'The Date object provides methods to get various date and time components. Remember that months are 0-indexed (January = 0) and days of the week are also 0-indexed (Sunday = 0).'
        },
        {
            title: 'Setting Date Components',
            code: `const date = new Date();

// Set components
date.setFullYear(2024);
date.setMonth(11);       // December (0-11)
date.setDate(25);
date.setHours(18, 30, 0); // 18:30:00

// Set using setTime (milliseconds since epoch)
const newYear = new Date('January 1, 2025 00:00:00');
date.setTime(newYear.getTime());

console.log(date); // Wed Jan 01 2025 00:00:00 GMT+0530`,
            explanation: 'You can modify date components using setter methods. Each setter method updates the date object in place.'
        },
        {
            title: 'Date Formatting',
            code: `const date = new Date();

// Built-in methods
console.log(date.toString());      // Full date string
console.log(date.toDateString());  // Date part only
console.log(date.toTimeString());  // Time part only
console.log(date.toISOString());   // ISO 8601 format (UTC)
console.log(date.toLocaleString());// Localized date and time

// Custom formatting using toLocaleString
const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZoneName: 'short'
};

console.log(date.toLocaleString('en-US', options));
// e.g., "Wednesday, September 10, 2025 at 05:40:00 PM IST"`,
            explanation: 'JavaScript provides several methods to format dates. The most flexible is `toLocaleString()` which supports localization and various formatting options.'
        },
        {
            title: 'Date Arithmetic',
            code: `// Adding/subtracting time
const date = new Date();

// Add 5 days
date.setDate(date.getDate() + 5);

// Add 2 months
date.setMonth(date.getMonth() + 2);

// Using timestamps for calculations
const today = new Date();
const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);

// Date difference in days
const date1 = new Date('2025-01-01');
const date2 = new Date('2025-12-31');
const diffTime = Math.abs(date2 - date1);
const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
console.log(diffDays + ' days'); // 364 days`,
            explanation: 'You can perform date arithmetic by manipulating individual components or using timestamps. Remember that months and years have varying lengths, so adding days is often safer than adding months or years directly.'
        },
        {
            title: 'Time Zones',
            code: `// Get current date and time
const now = new Date();

// Get timezone offset in hours and minutes
const timezoneOffset = now.getTimezoneOffset();
const offsetHours = Math.floor(Math.abs(timezoneOffset) / 60);
const offsetMinutes = Math.abs(timezoneOffset) % 60;
const offsetSign = timezoneOffset <= 0 ? '+' : '-';

// Format timezone string (e.g., +05:30)
const timezoneString = 'UTC' + offsetSign + 
    String(offsetHours).padStart(2, '0') + ':' + 
    String(offsetMinutes).padStart(2, '0');

// Format time in different timezones
function formatTime(date, timezone) {
    try {
        return date.toLocaleString('en-US', {
            timeZone: timezone,
            timeZoneName: 'short',
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true
        });
    } catch (e) {
        return 'Error: ' + e.message;
    }
}

// Display timezone information
console.log('Local Time:', now.toString());
console.log('Timezone Offset:', timezoneString);
console.log('New York Time:', formatTime(now, 'America/New_York'));
console.log('Tokyo Time:', formatTime(now, 'Asia/Tokyo'));
console.log('London Time:', formatTime(now, 'Europe/London'));`,
            explanation: 'This example shows how to work with timezones in JavaScript. The `getTimezoneOffset()` method returns the time difference in minutes between UTC and local time (positive if local timezone is behind UTC, negative if ahead). The example demonstrates formatting dates for different timezones and includes error handling. Note that timezone handling can be complex, and for production applications, consider using libraries like moment-timezone or date-fns-tz for more robust timezone support.'
        }
    ];

    const bestPractices = [
        'Always validate date inputs, as different browsers may parse date strings differently',
        'Be aware of timezone issues, especially when working with server-side dates',
        'Use libraries like date-fns or day.js for complex date manipulations',
        'When storing dates, prefer ISO 8601 format (YYYY-MM-DDTHH:mm:ss.sssZ)',
        'Be cautious with month indexes (0-11) when working with getMonth() and setMonth()',
        'For date-only values, consider setting the time to noon to avoid timezone-related bugs'
    ];

    const commonMistakes = [
        'Forgetting that months are 0-indexed (January = 0, December = 11)',
        'Assuming all months have the same number of days',
        'Not handling timezones correctly when working with dates from different timezones',
        'Using the Date constructor with strings in non-standard formats',
        'Not accounting for Daylight Saving Time changes',
        'Using getYear() instead of getFullYear() (getYear() is deprecated)'
    ];

    return (
        <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
                <span className="text-primary-600 dark:text-primary-400">JavaScript</span> Date Object
            </h1>

            <div className="prose max-w-none">
                <div className="mb-6 space-y-4">
                    <p className="text-gray-700 dark:text-gray-300">
                        The JavaScript <code>Date</code> object is used to work with dates and times. It provides methods to create, read, and manipulate dates and times in a platform-independent format. The Date object represents a single moment in time in a platform-independent format, measured in milliseconds since January 1, 1970, UTC (the Unix epoch).
                    </p>
                    <p className="text-gray-700 dark:text-gray-300">
                        While the Date object is powerful, it has some quirks and limitations. For complex date manipulations, consider using libraries like date-fns, day.js, or moment.js, which provide more intuitive APIs and better handling of edge cases.
                    </p>
                </div>

                <div className="space-y-8">
                    {examples.map((example, index) => (
                        <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">{example.title}</h3>
                            <CodeBlock code={example.code} />
                            <p className="text-gray-700 dark:text-gray-300 text-sm mt-3">{example.explanation}</p>
                        </div>
                    ))}
                </div>

                <div className="grid md:grid-cols-2 gap-6 mt-8">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                        <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">Best Practices</h3>
                        <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
                            {bestPractices.map((practice, index) => (
                                <li key={`best-${index}`} className="text-sm">{practice}</li>
                            ))}
                        </ul>
                    </div>

                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                        <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">Common Mistakes</h3>
                        <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
                            {commonMistakes.map((mistake, index) => (
                                <li key={`mistake-${index}`} className="text-sm">{mistake}</li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="mt-8 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-800">
                    <h3 className="text-xl font-semibold text-blue-800 dark:text-blue-200 mb-3">Time Zone Considerations</h3>
                    <p className="text-blue-700 dark:text-blue-300 mb-4">
                        Working with time zones can be challenging. JavaScript Date objects use the local time zone of the user's browser, which can lead to inconsistencies. For applications that need to handle multiple time zones:
                    </p>
                    <ul className="list-disc pl-5 space-y-1 text-blue-700 dark:text-blue-300">
                        <li>Store all dates in UTC on the server</li>
                        <li>Convert to local time only when displaying to users</li>
                        <li>Use the <code>Intl.DateTimeFormat</code> API for timezone-aware formatting</li>
                        <li>Consider using the <code>Temporal</code> proposal (stage 3) for future-proof code</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default DateInJS;
