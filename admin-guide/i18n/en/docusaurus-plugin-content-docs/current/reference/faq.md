---
title: Frequently Asked Questions
sidebar_position: 1
---

## 11. Frequently Asked Questions

### Q1: Why Did My Review Action Not Take Effect Immediately?

**A**: Exchange rates, system settings, and some high-risk business operations require review. After an ordinary administrator completes the first review or submits a change, the record may enter “Pending Super Administrator Review.” The current effective value does not change until final approval. Search by status in “Records,” then check the details and activity log.

### Q2: How Should I Handle an “Over-Allocated Stock”?

**A**: “Over-allocated” means that the allocated quantity exceeds the total quantity configured in the back office. Stop allocating further, then verify the stock code, total quantity, each investor’s quantity, and recent audit records. Apply a correction only after the cause and an approved remediation plan are confirmed. Do not offset the anomaly by creating a duplicate stock.

### Q3: What If an Investor Forgets Their Password?

**A**: Administrators cannot view a user’s password and must not set or collect a password on the user’s behalf. Direct the user to the account-recovery process currently available in the client. If recovery is unsuccessful, follow the organization’s authorized identity-verification and support process.

### Q4: What Should I Do If the System Shows Abnormal Data?

**A**:
1. Stop resubmitting, reviewing, or saving.
2. Record the time, environment, page route, and business-record ID.
3. Review the audit log for recent related changes.
4. If prices or assets are involved, check market-data synchronization and the active exchange-rate mode.
5. Submit redacted information through the internal support process.

### Q5: How Do I Change My Own Administrator Information?

**A**: The current back office directly provides language and theme controls and secure logout. If the page has no profile or password-change entry point, do not infer one from an old manual; request the change through the organization’s account-management process.

### Q6: Why Do Some Records Show “Pending Super Administrator Review”?

**A**: This status means that the administrator stage is complete, but the workflow still requires review by a person with final-approval permission. It commonly applies to system settings, manual exchange rates, and fund or position operations that the page marks as requiring final review. Follow the pending task and lifecycle shown in the record details.

### Q7: How Do I View All Activity for a Specific Investor?

**A**:
1. In “Investors,” locate the user precisely by name, mobile number, email, or VC User ID.
2. Open the details page and review the account, asset, and business-record sections provided by the page.
3. For a complete back-office activity trail, open “Audit Log” and search using the target user ID and a time range.

### Q8: Where Can I Resume an Enterprise-Onboarding Draft?

**A**: Open “Customer Management → Enterprise Users,” find the enterprise record whose information status is Draft, and select “Continue Onboarding” from the action menu. Check the current stage and uploaded files before continuing. Do not create a duplicate draft for the same enterprise.

### Q9: What If Variables Still Appear in the Message-Template Preview?

**A**: Check that the field names in Payload JSON exactly match “Available Variables,” that every required variable has a test value, and that the JSON is valid. Do not save production copy until the preview passes. Previewing does not send a real message.

### Q10: What Should I Do If Market-Data Synchronization Fails?

**A**: First click “Refresh” to confirm the latest status, then review the corresponding market’s last synchronization time, trigger source, and error status. Do not repeatedly trigger multiple synchronization tasks at the same time. Markets such as China A-shares that show “Unavailable” do not require a forced operation.

### Q11: What Should I Do If a `ChunkLoadError` or Red Error Overlay Appears After Navigation?

**A**: Stop the current operation and refresh the page. After confirming that nothing was submitted twice, log in again. If the error remains, record the routes before and after the error, time, environment, and complete error text, and report them through the internal technical-support process. Do not continue reviewing, saving, or submitting forms until the error disappears.
