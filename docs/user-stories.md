# Epics & User Stories

## Epics Overview
This document contains the epics for the SyncedHealth CortiSense application.

## EP-001: Identity and Security Management

**Description** As a professional or administrator, I want to manage my account and credentials to securely access the platform and protect my information.

### Acceptance Criteria

#### Scenario 1: New Account Verification
Given a doctor has just registered,
When they enter the OTP code sent to their email,
Then the system marks the account as "Verified" and grants access.

#### Scenario 2: Access Restriction
Given a user exhibits anomalous behavior or has left the institution,
When the administrator applies the restriction policy,
Then the system revokes the access token and denies future logins.


## EP-002: Medical Personnel Management

**Description** As a hospital administrator, I want to register and search for medical profiles in the system to keep the user roster up to date.

### Acceptance Criteria

#### Scenario 1: Successful Search
Given the administrator is in the management panel,
When they search for a doctor by their registration number,
Then the system returns the doctor's profile card.

#### Scenario 2: New Doctor Registration by Admin
Given a new resident is admitted to the hospital,
When the administrator submits the registration form,
Then the system creates the doctor's profile and sends an invitation email.


## EP-003: Wearable Management and Configuration

**Description** As a user, I want to link my IoT devices and configure monitoring thresholds to ensure an accurate reading of my biomarkers.

### Acceptance Criteria

#### Scenario 1: Successful Pairing
Given the wearable is in pairing mode,
When the user scans the device from the app,
Then the system links it to the account and displays the status "Connected".

#### Scenario 2: Threshold Setting
Given the user accesses their sensor settings,
When they set a new maximum heart rate limit,
Then the system saves the threshold and applies it to future readings.


## EP-004: Analysis of Operational Stress and Fatigue

**Description** As a system, I want to analyze the data captured in real time to determine if the doctor is in a normal state or critically fatigued.

### Acceptance Criteria

#### Scenario 1: High Level Detection
Given the analysis engine receives a data stream,
When heart rate variability (HRV) falls below the baseline threshold for 10 minutes,
Then the system registers a "High Fatigue" status.

#### Scenario 2: Return to Normal
Given the user was in an alert state,
When their biomarkers stabilize within the healthy range,
Then the system updates their status to "Normal".


## EP-005: Data Persistence and Backup

**Description** As a system, I want to manage the storage, updating, and backup of biometric data to ensure its availability and historical integrity.

### Acceptance Criteria

#### Scenario 1: Continuous Storage
Given the wearable device transmits telemetry,
When the data packets reach the backend,
Then the system persists them in encrypted form in the database.

#### Scenario 2: Backup Generation
Given it is midnight on Sunday,
When the backup policy is executed,
Then the system packages the week's data and saves it to cold storage.


## EP-006: Alerts and Notifications Dispatch

**Description** As a user and administrator, I want to receive immediate notifications of critical events to prevent medical accidents.

### Acceptance Criteria

#### Scenario 1: User Notification
Given a critical stress spike is detected.
When the system generates the alert, 
Then it sends a priority push notification to the doctor's smartphone.

#### Scenario 2: Administrative Dashboard Alert
Given a doctor ignores a critical fatigue alert.
When the escalation policy is triggered,
Then the system sends a visual alert to the supervisor's dashboard.


## EP-007: Rest Management and Optimization

**Description** As a physician and administrator, I want to suggest, schedule, and modify rest periods based on recorded fatigue levels.

### Acceptance Criteria

#### Scenario 1: Rest Suggestion Accepted
Given that the system recommends a fatigue break.
When the doctor clicks "Accept Rest,"
Then the system temporarily blocks their appointment in Google Calendar.

#### Scenario 2: Modification Rejected by Admin
Given that the doctor requests to move their rest period forward.
When the administrator determines there is no relief staff available,
Then the request is rejected, and the system maintains the original rest period.


## EP-008: Hospital Shift Management

**Description** As an administrator, I want to upload, assign, and reschedule medical shifts, validating staff availability and fatigue.

### Acceptance Criteria

#### Scenario 1: Shift Assignment Validated
Given the administrator assigns a 12-hour shift,
When the system checks the availability policy,
Then it confirms the assignment and notifies the physician.

#### Scenario 2: Rescheduling Due to Fatigue
Given a physician assigned to surgery presents with "Extreme Fatigue" prior to their shift,
When the system executes the rescheduling policy,
Then it suggests an available replacement to the administrator.


## EP-009: Plan and Billing Management

**Description** As a clinic director, I want to subscribe to a CortiSense plan, manage my payments, and maintain access to the platform.

### Acceptance Criteria

#### Scenario 1: Successful Subscription Payment
Given the customer selects the "Enterprise" plan.
When entering their card details and processing the payment via Stripe API,
Then system activates the subscription and enables access to premium features.

#### Scenario 2: Subscription Expiration
Given the billing cycle ends and the automatic payment fails.
When the 3-day grace period finishes,
Then the system updates the status to "Expired" and restricts access to the dashboard.


## User Stories Overview
This document contains the user stories for the SyncedHealth CortiSense application.

## US-001: Medical Registration

**Description** As a physician, I want to register on the platform to create my professional account.

### Acceptance Criteria

#### Scenario 1:
Given valid data
When I press "Register"
Then the account is created.

#### Scenario 2:
Given an already registered email
When I try to register
Then the system displays a duplicate entry error.


## US-002: Account Verification

**Description** As a system, I want to verify the user's email to enable their secure access to the platform.

### Acceptance Criteria

#### Scenario 1:
Given the user enters the correct token,
When they submit it,
Then their account is verified.

#### Scenario 2:
Given an expired token,
When they try to verify,
Then they are offered the option to resend a new code.


## US-003: Staff Search

**Description** As an administrator, I want to use the search panel to quickly locate a physician's profile.

### Acceptance Criteria

#### Scenario 1:
Given that I enter the last name "García",
When I press search,
Then I see a list of matching doctors.

#### Scenario 2:
Given a search with no matches,
When the system processes the query,
Then it displays the status "Doctor not found" and suggests clearing filters.


## US-004: Wearable Linking

**Description** As a user, I want to pair my smartwatch to begin data collection.

### Acceptance Criteria

#### Scenario 1:
Given Bluetooth is on and the wearable is nearby,
When I press "Pair,"
Then the device is paired to the account.

#### Scenario 2:
Given Bluetooth is off,
When I try to pair,
Then the app throws an error and prompts me to turn on Bluetooth.


## US-005: Threshold Configuration

**Description** As an administrator, I want to set stress thresholds by area to customize security policy alerts.

### Acceptance Criteria

#### Scenario 1:
Given I set a low HRV limit for the ICU,
When I save the changes,
Then the policy for that department is updated.

#### Scenario 2:
Given I try to save a threshold with negative values,
When I submit the form,
Then the system blocks the action due to an invalid format.


## US-006: Low Battery Alert

**Description** As a user, I want to know if my device is about to shut down so I can charge it in time.

### Acceptance Criteria

#### Scenario 1:
Given the battery drops to 15%,
when the system reads the status,
Then a red battery icon is displayed on the panel.

#### Scenario 2:
Given the battery reaches 5%,
When the system reads the status,
Then a push notification is sent forcing me to connect the charger.


## US-007: Start Monitoring

**Description** As a system, I want to launch the analytics engine once the device is active to assess stress.

### Acceptance Criteria

#### Scenario 1:
Given the device is in place,
When the workday begins,
Then the status changes to "Monitoring Started".

#### Scenario 2:
Given the device is removed from the wrist,
When the sensor does not detect skin,
Then the system pauses the analysis and marks the status as "Inactive".


## US-008: Fatigue Detection

**Description** As a system, I want to apply detection policies to biomarkers to identify fatigue.

### Acceptance Criteria

#### Scenario 1:
Given the algorithm detects prolonged abnormal patterns,
When they cross the level policy,
Then it categorizes the status as "High Levels Detected".

#### Scenario 2:
Given the values remain stable,
when the policy is evaluated,
Then it records "Normal Levels Detected".


## US-009: Data Storage

**Description** As a system, I want to continuously save health metrics to populate dashboards.

### Acceptance Criteria

#### Scenario 1:
Given there is an internet connection,
When the wearable's data packets arrive,
Then they are immediately saved to the database.

#### Scenario 2:
Given there is no internet connection in the hospital,
When the device collects data,
Then the mobile app caches it locally until the connection is restored.


## US-010: Report Export

**Description** As an administrator, I want to export biometric data to CSV for occupational health audits.

### Acceptance Criteria

#### Scenario 1:
Given that a valid date range is selected, 
When "Export CSV" is pressed,
Then the file is downloaded successfully.

#### Scenario 2:
Given that a range with no recorded data is selected, 
When "export" is pressed,
Then the system displays a "Data empty for this period" message.


## US-011: Alert Generation

**Description** As a system, I want to generate alert notifications when the analysis policy dictates it, to alert staff.

### Acceptance Criteria

#### Scenario 1:
Given that the analysis indicates "Critical Fatigue," 
When the dispatcher receives it,
Then, an alert classified as "Urgent" is generated.

#### Scenario 2:
Given that the alert is generated,
When it is sent via the FCM API,
Then, it is recorded with a timestamp in the alert log.


## US-012: Escalate to Admin

**Description** As an administrator, I want to receive alerts ignored by physicians so I can take control of the situation.

### Acceptance Criteria

#### Scenario 1:
Given that the doctor does not rest after the alert,
When 15 minutes pass,
Then, a notification is sent to the Admin Dashboard.

#### Scenario 2:
Given that the admin receives the escalation,
When they click on the alert,
Then, they are redirected to the doctor's current location and status.


## US-013: Break Scheduling

**Description** As an administrator, I want to schedule staff breaks based on fatigue reports.

### Acceptance Criteria

#### Scenario 1:
Given the administrator schedules a 30-minute break,
When it is saved in the calendar,
Then, the status changes to "Scheduled Break".

#### Scenario 2:
Given the administrator attempts to schedule a break that overlaps with surgery,
When it is saved,
Then the system displays a scheduling conflict alert.


## US-014: Modify Break

**Description** As a physician, I want to request a change to my break schedule if an emergency situation requires it.

### Acceptance Criteria

#### Scenario 1:
Given I request to postpone my break by 1 hour,
When I submit the request,
Then the status changes to "Modification Requested".

#### Scenario 2:
Given I cancel the request before the admin sees it,
When I press "Undo",
Then, the system restores the original break.


## US-015: Modification Approval

**Description** As an administrator, I want to approve or reject my staff's break change requests.

### Acceptance Criteria

#### Scenario 1:
Given a doctor requests to move their break,
When I approve the request,
Then, the system updates the schedule using the Google Calendar API.

#### Scenario 2:
Given I reject the modification,
When I save the rejection,
Then the system notifies the doctor that "The original break remains."


## US-016: Upload Schedules

**Description** As an administrator, I want to upload the shift matrix so the system knows the week's assignments.

### Acceptance Criteria

#### Scenario 1:
Given that I upload a valid CSV file,
When it is processed,
Then the panel displays the "Uploaded Schedules".

#### Scenario 2:
Given that I upload a file with a corrupted format,
When the system evaluates it,
Then it stops the upload and displays the row where the error occurred.


## US-017: Assign Validated Shift

**Description** As a system, I want to validate the availability policy before assigning a shift to a physician.

### Acceptance Tests

#### Scenario 1:
Given that the doctor does not exceed the weekly working hours,
When a shift is assigned,
Then the status changes to "Shift Assigned".

#### Scenario 2:
Given that the doctor already has a shift assigned at that time,
When the assignment is attempted,
Then the validation fails due to overlap.


## US-018: Rescheduling due to Fatigue

**Description** As an administrator, I want to reschedule a shift if the assigned physician is experiencing high levels of physical exhaustion.

### Acceptance Tests

#### Scenario 1:
Given that the primary doctor has critical fatigue,
When I select the "Reschedule Shift" option,
Then the system shows me the available substitute doctors.

#### Scenario 2:
Given I confirm the change of account holder,
When I apply the modification,
Then the appointment is marked as "Rescheduled" and both doctors are notified.


## US-019: Plan Checkout

**Description** As a user, I want to process my payment through a secure gateway to activate my subscription.

### Acceptance Tests

#### Scenario 1:
Given I enter valid card credentials
When the Stripe API approves the transaction
Then the system marks the "Payment Confirmed".

#### Scenario 2:
Given the card has insufficient funds,
When I attempt to pay,
Then the platform displays "Payment Declined" and returns me to the payment method selection screen.


## US-020: Cancel Subscription

**Description** As a hospital administrator, I want to be able to cancel the subscription if the tool is no longer needed.

### Acceptance Tests

#### Scenario 1:
Given I initiate the contract cancellation process,
When I confirm the cancellation,
Then the system schedules the termination for the last day of the current billing cycle.

#### Scenario 2:
Given I cancel the subscription,
When I attempt to access premium reports after the end of the billing cycle,
Then access is denied.

## US-021
## US-022
## US-023
## US-024
## US-025
## US-026
## US-027
## US-028
## US-029
## US-030
## US-031
## US-032
## US-033
## US-034
## US-035
## US-036
## US-037
## US-038
## US-039