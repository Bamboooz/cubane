use std::time::Duration;

pub fn format_duration(duration: Duration) -> String {
    let seconds = duration.as_secs();
    let minutes = seconds / 60;
    let hours = minutes / 60;
    let days = hours / 24;
    let months = days / 30; // Approximate months as 30 days
    let years = days / 365; // Approximate years as 365 days

    if years > 0 {
        format!("{} years ago", years)
    } else if months > 0 {
        format!("{} months ago", months)
    } else if days > 0 {
        format!("{} days ago", days)
    } else if hours > 0 {
        format!("{} hours ago", hours)
    } else if minutes > 0 {
        format!("{} minutes ago", minutes)
    } else {
        format!("{} seconds ago", seconds)
    }
}
