import React, { useState } from 'react';
import { AlertCircle, AlertTriangle, ShieldCheck, Terminal, HelpCircle, ArrowRight, RotateCcw } from 'lucide-react';
import { incrementSimulatorInteraction } from '../../progress/terraformProgress';

export interface FailureScenario {
  id: string;
  title: string;
  category: 'Configuration' | 'State & Lock' | 'Security & Auth' | 'Graph & Logic' | 'Provider & Cloud';
  errorOutput: string;
  whatHappened: string;
  why: string;
  howDoYouKnow: string;
  howDoYouFixIt: string;
  howDoYouPreventIt: string;
  badCodeSnippet: string;
  fixedCodeSnippet: string;
}

export const FAILURE_SCENARIOS: FailureScenario[] = [
  {
    id: 'wrong-variable',
    title: '1. Wrong Variable Reference',
    category: 'Configuration',
    errorOutput: `Error: Reference to undeclared input variable
  on main.tf line 14, in resource "aws_instance" "web":
  14:   instance_type = var.instnace_type
An input variable with the name "instnace_type" has not been declared.
Did you mean "instance_type"?`,
    whatHappened: 'Terraform failed during plan/validate because the code referenced a variable name that was misspelled or not defined in variables.tf.',
    why: 'HCL2 is strictly typed and validates all identifier references at compile time before communicating with cloud APIs.',
    howDoYouKnow: 'The CLI prints "Error: Reference to undeclared input variable" pointing directly to the file, line number, and a "Did you mean?" typo suggestion.',
    howDoYouFixIt: 'Correct the spelling typo in main.tf or declare `variable "instance_type" {}` in variables.tf.',
    howDoYouPreventIt: 'Use the official HashiCorp Terraform VS Code extension with language server autocomplete to catch typos before saving.',
    badCodeSnippet: `resource "aws_instance" "web" {\n  ami           = "ami-0c55b159cbfafe1f0"\n  instance_type = var.instnace_type # Typo!\n}`,
    fixedCodeSnippet: `resource "aws_instance" "web" {\n  ami           = "ami-0c55b159cbfafe1f0"\n  instance_type = var.instance_type # Correct\n}`
  },
  {
    id: 'missing-provider',
    title: '2. Missing Provider Configuration',
    category: 'Provider & Cloud',
    errorOutput: `Error: Could not satisfy plugin requirements
Plugin re-authentication required or provider not declared.
Please run "terraform init" to install required providers.`,
    whatHappened: 'A resource was declared without its required provider plugin being initialized or declared in required_providers.',
    why: 'Terraform Core is completely decoupled from cloud APIs. It cannot plan resources without downloading the respective gRPC provider binary.',
    howDoYouKnow: 'The CLI returns exit code 1 with "Could not satisfy plugin requirements" or "Provider configuration not present".',
    howDoYouFixIt: 'Add the provider block to providers.tf and run `terraform init` to download the verified plugin.',
    howDoYouPreventIt: 'Always maintain a versions.tf file with explicit `required_providers` constraints.',
    badCodeSnippet: `resource "kubernetes_deployment" "app" {\n  # Used without declaring kubernetes provider\n}`,
    fixedCodeSnippet: `terraform {\n  required_providers {\n    kubernetes = {\n      source  = "hashicorp/kubernetes"\n      version = "~> 2.25.0"\n    }\n  }\n}`
  },
  {
    id: 'invalid-resource',
    title: '3. Invalid Resource Type or Argument',
    category: 'Configuration',
    errorOutput: `Error: Unsupported block type
  on main.tf line 8:
   8: resource "aws_ec2_server" "web" {
Blocks of type "aws_ec2_server" are not expected here. Did you mean "aws_instance"?`,
    whatHappened: 'An invalid or non-existent resource type was declared in HCL.',
    why: 'Provider schemas define an exact set of managed resource types. Invented or outdated names fail schema validation.',
    howDoYouKnow: 'The CLI throws "Unsupported block type" or "Unsupported argument" referencing the exact invalid token.',
    howDoYouFixIt: 'Check the official Terraform Registry documentation for the provider to find the valid resource name (e.g. `aws_instance`).',
    howDoYouPreventIt: 'Never guess resource types; use registry documentation or `terraform-ls` schema introspection.',
    badCodeSnippet: `resource "aws_ec2_server" "web" {\n  # Invalid resource type\n}`,
    fixedCodeSnippet: `resource "aws_instance" "web" {\n  # Valid official resource type\n}`
  },
  {
    id: 'auth-failure',
    title: '4. Cloud Authentication Failure',
    category: 'Security & Auth',
    errorOutput: `Error: error configuring Terraform AWS Provider: no valid credential sources for Terraform AWS Provider.
Please see https://registry.terraform.io/providers/hashicorp/aws/latest/docs#authentication-and-configuration
AuthFailure: The security token included in the request is expired`,
    whatHappened: 'Terraform attempted to connect to cloud APIs but the credentials (AWS_PROFILE, STS token, or Azure SP) were expired or missing.',
    why: 'Terraform requires valid IAM credentials to authenticate each API request against cloud endpoints.',
    howDoYouKnow: 'AuthFailure, 401 Unauthorized, or "no valid credential sources" error in CLI output.',
    howDoYouFixIt: 'Refresh local credentials via `aws sso login`, `gcloud auth application-default login`, or export updated environment tokens.',
    howDoYouPreventIt: 'In CI/CD pipelines, use OpenID Connect (OIDC) Workload Identity Federation instead of static long-lived credentials.',
    badCodeSnippet: `# Hardcoded expired keys in provider block (CRITICAL SECURITY RISK)\nprovider "aws" {\n  access_key = "AKIAEXPIRED..."\n  secret_key = "..."\n}`,
    fixedCodeSnippet: `# Environment/OIDC role assumption (Recommended)\nprovider "aws" {\n  region = "us-east-1"\n  # Auth discovered from environment/OIDC\n}`
  },
  {
    id: 'permission-denied',
    title: '5. Permission Denied (403 Forbidden)',
    category: 'Security & Auth',
    errorOutput: `Error: creating EC2 VPC: UnauthorizedOperation: You are not authorized to perform this operation.
status code: 403, request id: a1b2c3d4-e5f6-7890-abcd-ef0123456789`,
    whatHappened: 'Terraform authenticated successfully, but the IAM role or user lacked the required cloud permissions to create the asset.',
    why: 'Cloud providers enforce IAM RBAC policies. Creating a VPC requires `ec2:CreateVpc`, which was missing from the calling identity.',
    howDoYouKnow: 'The cloud API returns HTTP 403 Forbidden with UnauthorizedOperation or AccessDenied.',
    howDoYouFixIt: 'Grant the necessary least-privilege IAM action (`ec2:CreateVpc`, `ec2:CreateTags`) to the deployment role.',
    howDoYouPreventIt: 'Audit IAM policies using cloud access analyzers and maintain dedicated Terraform deployment roles with tested boundaries.',
    badCodeSnippet: `# Running under an IAM role missing ec2:CreateVpc permissions`,
    fixedCodeSnippet: `# Attach scoped IAM policy: Action = ["ec2:CreateVpc", "ec2:Describe*"]`
  },
  {
    id: 'dependency-cycle',
    title: '6. Dependency Cycle (Circular Reference)',
    category: 'Graph & Logic',
    errorOutput: `Error: Cycle: aws_security_group.app, aws_security_group.db, aws_security_group.app
There is a circular dependency between resources that prevents Terraform from computing execution order.`,
    whatHappened: 'Resource A depends on Resource B, while Resource B simultaneously depends on Resource A.',
    why: 'Terraform requires a Directed Acyclic Graph (DAG) to determine the order of operations. Cycles make ordering mathematically impossible.',
    howDoYouKnow: 'The CLI throws "Error: Cycle: [Resource List]" during plan generation.',
    howDoYouFixIt: 'Break the circular dependency by using decoupled child resources (such as `aws_security_group_rule`) instead of inline rules.',
    howDoYouPreventIt: 'Avoid cross-referencing security groups inline; declare rules as separate standalone resources.',
    badCodeSnippet: `resource "aws_security_group" "app" {\n  ingress {\n    security_groups = [aws_security_group.db.id] # Cycle!\n  }\n}\nresource "aws_security_group" "db" {\n  ingress {\n    security_groups = [aws_security_group.app.id] # Cycle!\n  }\n}`,
    fixedCodeSnippet: `resource "aws_security_group" "app" {}\nresource "aws_security_group" "db" {}\n# Break cycle via standalone rule:\nresource "aws_security_group_rule" "app_to_db" {\n  type                     = "ingress"\n  source_security_group_id = aws_security_group.app.id\n  security_group_id        = aws_security_group.db.id\n}`
  },
  {
    id: 'state-lock',
    title: '7. State Lock Error (Deadlock)',
    category: 'State & Lock',
    errorOutput: `Error: Error acquiring the state lock
Lock Info:
  ID:        a84f3c21-9988-4422-b531-123456789abc
  Path:      corp-tf-state-prod/services/core/terraform.tfstate
  Operation: OperationTypePlan
  Who:       jenkins@build-agent-04
  Created:   2026-10-02 09:15:00 UTC`,
    whatHappened: 'Terraform refused to run because another process (or a killed previous pipeline) already holds the state lock mutex.',
    why: 'Remote backends use distributed locks (DynamoDB, Azure Blob leases) to prevent concurrent writes from corrupting the state file.',
    howDoYouKnow: 'The CLI outputs "Error acquiring the state lock" along with Lock ID, Who, and Creation timestamp.',
    howDoYouFixIt: 'First verify that no colleague or CI/CD job is actually running. If confirmed deadlocked, run `terraform force-unlock <LOCK-ID>`.',
    howDoYouPreventIt: 'Configure pipeline timeouts so crashed jobs gracefully clean up locks, and never run parallel applies on the same workspace.',
    badCodeSnippet: `# Running terraform apply simultaneously in 2 terminals on the same state`,
    fixedCodeSnippet: `terraform force-unlock a84f3c21-9988-4422-b531-123456789abc`
  },
  {
    id: 'resource-exists',
    title: '8. Resource Already Exists in Cloud',
    category: 'Provider & Cloud',
    errorOutput: `Error: creating S3 Bucket (my-corp-assets): BucketAlreadyOwnedByYou: Your previous request to create the named bucket succeeded and you already own it.
status code: 409`,
    whatHappened: 'Terraform tried to create an asset that already exists in the cloud account but is not recorded in the Terraform state file.',
    why: 'Terraform only knows what is tracked in terraform.tfstate. If an asset was created via console, Terraform assumes it does not exist and attempts creation.',
    howDoYouKnow: 'HTTP 409 Conflict, "AlreadyExists", or "BucketAlreadyOwnedByYou" in apply output.',
    howDoYouFixIt: 'Import the existing asset into state using `terraform import aws_s3_bucket.assets my-corp-assets` or an `import {}` block.',
    howDoYouPreventIt: 'Never create resources manually in the cloud console when managing environments with Terraform.',
    badCodeSnippet: `resource "aws_s3_bucket" "assets" {\n  bucket = "existing-unmanaged-bucket" # Exists in AWS, missing from state\n}`,
    fixedCodeSnippet: `import {\n  to = aws_s3_bucket.assets\n  id = "existing-unmanaged-bucket"\n}`
  },
  {
    id: 'config-drift',
    title: '9. Configuration Drift (Out-of-Band Mutation)',
    category: 'State & Lock',
    errorOutput: `Note: Objects have changed outside of Terraform
Terraform detected the following changes made outside of Terraform since the last "terraform apply":
  ~ resource "aws_security_group" "web" {
      - description = "Standard web firewall"
      + description = "Emergency hotfix opened port 22 (manual change)"
    }`,
    whatHappened: 'An administrator manually tweaked a cloud asset in the AWS/Azure web console without updating the Terraform Git code.',
    why: 'Cloud infrastructure can be modified through multiple control planes (CLI, Console, Terraform). External mutations produce drift.',
    howDoYouKnow: '`terraform plan` outputs "Objects have changed outside of Terraform" with a diff of the out-of-band changes.',
    howDoYouFixIt: 'Run `terraform apply` to overwrite the manual changes back to code, or update your HCL code to match if the change was intentional.',
    howDoYouPreventIt: 'Revoke write permissions in the cloud console for human operators; enforce Git-only infrastructure modifications.',
    badCodeSnippet: `# Manually editing ingress rules in AWS console during an incident`,
    fixedCodeSnippet: `# Run terraform plan -refresh-only to audit and reconcile drift`
  },
  {
    id: 'accidental-destroy',
    title: '10. Accidental Destruction of Production Database',
    category: 'State & Lock',
    errorOutput: `Plan: 0 to add, 0 to change, 1 to destroy.
  - resource "aws_db_instance" "prod_database" {
      - id = "rds-prod-master"
      - ...
    }
Do you really want to destroy all resources?`,
    whatHappened: 'A destructive plan was generated that would wipe out a production database due to an address rename or accidental destroy flag.',
    why: 'Changing resource addresses or modifying immutable arguments triggers full replacement (destroy-then-create).',
    howDoYouKnow: 'Red minus (-) symbols or (+/-) replacement markers in `terraform plan` output.',
    howDoYouFixIt: 'Attach `lifecycle { prevent_destroy = true }` to state-critical resources to block any accidental deletion.',
    howDoYouPreventIt: 'Use `prevent_destroy`, enable termination protection in the cloud, and require multi-person approval gates on PRs.',
    badCodeSnippet: `resource "aws_db_instance" "prod_database" {\n  identifier = "prod-db"\n  # No lifecycle guard!\n}`,
    fixedCodeSnippet: `resource "aws_db_instance" "prod_database" {\n  identifier = "prod-db"\n  lifecycle {\n    prevent_destroy = true # Throws hard error if destroy is attempted\n  }\n}`
  },
  {
    id: 'incorrect-count',
    title: '11. Incorrect count (Index Shift Cascade)',
    category: 'Graph & Logic',
    errorOutput: `Plan: 1 to add, 0 to change, 1 to destroy.
  -/+ resource "aws_subnet" "public" [1] {
      ~ cidr_block = "10.0.2.0/24" => "10.0.3.0/24" # FORCES REPLACEMENT!
    }`,
    whatHappened: 'An item was removed from the middle of a list used in `count`, causing all subsequent resources to shift indices and be destroyed/recreated.',
    why: '`count` binds resources to integer array indices `[0]`, `[1]`, `[2]`. Deleting item 1 causes item 2 to become item 1, forcing recreation.',
    howDoYouKnow: '`terraform plan` shows destruction and recreation of resources that you did not intend to touch.',
    howDoYouFixIt: 'Migrate from `count` to `for_each` using a unique map or set of strings.',
    howDoYouPreventIt: 'Always prefer `for_each` over `count` when managing independent, stateful resources.',
    badCodeSnippet: `# Fragile list indexing\nvariable "subnets" { default = ["10.0.1.0/24", "10.0.2.0/24", "10.0.3.0/24"] }\nresource "aws_subnet" "p" {\n  count      = length(var.subnets)\n  cidr_block = var.subnets[count.index]\n}`,
    fixedCodeSnippet: `# Resilient key-based mapping\nresource "aws_subnet" "p" {\n  for_each   = toset(var.subnets)\n  cidr_block = each.key\n}`
  },
  {
    id: 'incorrect-foreach',
    title: '12. Incorrect for_each Expression (Non-Map/Set)',
    category: 'Graph & Logic',
    errorOutput: `Error: Invalid for_each argument
  on main.tf line 6, in resource "aws_iam_user" "developers":
   6:   for_each = var.developer_names
The given "for_each" argument value is unsuitable: the "for_each" argument must be a map, or set of strings, and you have provided a value of type list of string.`,
    whatHappened: 'A list was passed directly to `for_each` without converting it to a set or map.',
    why: '`for_each` requires deterministic, unique keys. Lists allow duplicate values, which cannot serve as unique resource addresses.',
    howDoYouKnow: 'The CLI prints "Invalid for_each argument: must be a map, or set of strings".',
    howDoYouFixIt: 'Wrap the list with `toset(var.developer_names)` to ensure unique keys.',
    howDoYouPreventIt: 'Declare collection variables as `type = set(string)` when designed specifically for `for_each`.',
    badCodeSnippet: `resource "aws_iam_user" "devs" {\n  for_each = ["alice", "bob", "alice"] # List with duplicate\n  name     = each.key\n}`,
    fixedCodeSnippet: `resource "aws_iam_user" "devs" {\n  for_each = toset(["alice", "bob"]) # Valid set\n  name     = each.key\n}`
  },
  {
    id: 'broken-module',
    title: '13. Broken Module Source or Compatibility',
    category: 'Configuration',
    errorOutput: `Error: Failed to download module
Could not download module "vpc" (main.tf:3) source code from
"git::https://github.com/terraform-aws-modules/terraform-aws-vpc.git?ref=v99.0.0":
fatal: Remote branch v99.0.0 not found in upstream origin`,
    whatHappened: 'Terraform failed during `terraform init` because a referenced module source URL, branch, or tag did not exist.',
    why: 'Modules are resolved during initialization. Invalid Git refs or registry versions halt setup immediately.',
    howDoYouKnow: '`terraform init` reports "Failed to download module: Remote branch ... not found".',
    howDoYouFixIt: 'Verify the release tag or Git branch on the upstream repository and correct the `?ref=` parameter.',
    howDoYouPreventIt: 'Use published registry semantic versions (`version = "~> 5.0"`) instead of arbitrary Git branches.',
    badCodeSnippet: `module "vpc" {\n  source = "git::https://github.com/org/repo.git?ref=non-existent-tag"\n}`,
    fixedCodeSnippet: `module "vpc" {\n  source  = "terraform-aws-modules/vpc/aws"\n  version = "~> 5.5.0"\n}`
  },
  {
    id: 'provider-version-conflict',
    title: '14. Provider Version Constraint Conflict',
    category: 'Provider & Cloud',
    errorOutput: `Error: Failed to query available provider packages
Could not retrieve the list of available versions for provider hashicorp/aws:
locked provider registry.terraform.io/hashicorp/aws 4.50.0 does not match configured version constraint ~> 5.0.0`,
    whatHappened: 'The `.terraform.lock.hcl` file locked the provider to version 4.50.0, but the code was modified to require `~> 5.0.0`.',
    why: 'The dependency lockfile protects against unintended upgrades. When code requirements change, explicit upgrade is mandatory.',
    howDoYouKnow: '`terraform init` throws "locked provider ... does not match configured version constraint".',
    howDoYouFixIt: 'Run `terraform init -upgrade` to recalculate checksums and update the lockfile.',
    howDoYouPreventIt: 'Never manually edit `.terraform.lock.hcl`. Always manage upgrades via `terraform init -upgrade`.',
    badCodeSnippet: `# Running terraform init without -upgrade after bumping provider version in versions.tf`,
    fixedCodeSnippet: `terraform init -upgrade`
  },
  {
    id: 'invalid-type',
    title: '15. Invalid Type Passed to Variable',
    category: 'Configuration',
    errorOutput: `Error: Invalid value for input variable
  on terraform.tfvars line 2:
   2: replica_count = "three"
The given value is not suitable for var.replica_count declared at variables.tf:4,1-25:
number required.`,
    whatHappened: 'A string value ("three") was provided to an input variable expecting a number.',
    why: 'HCL2 enforces strict type safety. Passing strings where integers are required causes immediate evaluation failure.',
    howDoYouKnow: 'The CLI prints "Invalid value for input variable: number required".',
    howDoYouFixIt: 'Change the value in terraform.tfvars from `"three"` to the numeric integer `3`.',
    howDoYouPreventIt: 'Provide example values and validate input schemas using type constraints.',
    badCodeSnippet: `# terraform.tfvars\nreplica_count = "three" # String passed to number variable`,
    fixedCodeSnippet: `# terraform.tfvars\nreplica_count = 3 # Valid integer number`
  },
  {
    id: 'missing-variable',
    title: '16. Missing Required Variable (Interactive Prompt Block)',
    category: 'Configuration',
    errorOutput: `var.database_password
  Enter a value:
Error: No value for required variable
In non-interactive mode (-input=false), Terraform cannot prompt for values.`,
    whatHappened: 'A required variable without a default value was not supplied via tfvars or CLI, blocking non-interactive CI/CD runs.',
    why: 'If a variable lacks a `default` and is omitted from tfvars, Terraform stops and prompts for interactive user input.',
    howDoYouKnow: 'The terminal hangs waiting for input, or CI/CD pipelines fail with "No value for required variable".',
    howDoYouFixIt: 'Supply the variable via `terraform.tfvars`, `-var="database_password=..."`, or `TF_VAR_database_password`.',
    howDoYouPreventIt: 'In automated CI/CD pipelines, always run with `-input=false` and verify all required variables are injected.',
    badCodeSnippet: `# variables.tf\nvariable "database_password" {\n  type = string # No default, and omitted in tfvars!\n}`,
    fixedCodeSnippet: `# Inject via environment in CI/CD:\nexport TF_VAR_database_password="SecureVaultPassword123!"`
  }
];

export const TerraformFailureArena: React.FC = () => {
  const [selectedScenario, setSelectedScenario] = useState<FailureScenario>(FAILURE_SCENARIOS[0]);
  const [viewingFix, setViewingFix] = useState(false);

  const handleSelect = (s: FailureScenario) => {
    incrementSimulatorInteraction();
    setSelectedScenario(s);
    setViewingFix(false);
  };

  return (
    <div
      style={{
        background: '#090d16',
        border: '1px solid rgba(239, 68, 68, 0.3)',
        borderRadius: '12px',
        padding: '1.25rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        color: '#e2e8f0',
        fontFamily: 'Inter, system-ui, sans-serif'
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <AlertTriangle size={18} color="#ef4444" />
            <span style={{ fontSize: '1.05rem', fontWeight: 700, color: '#f8fafc' }}>
              Safe Failure Simulation Arena
            </span>
          </div>
          <p style={{ margin: '0.2rem 0 0 0', fontSize: '0.8rem', color: '#94a3b8' }}>
            Deliberately learn from the 16 most common, devastating Terraform production errors and their recovery paths.
          </p>
        </div>

        <button
          onClick={() => setViewingFix(!viewingFix)}
          style={{
            background: viewingFix ? 'linear-gradient(135deg, #10b981, #059669)' : 'rgba(132, 79, 186, 0.2)',
            border: `1px solid ${viewingFix ? '#10b981' : '#844fba'}`,
            color: '#fff',
            padding: '0.45rem 0.9rem',
            borderRadius: '6px',
            fontSize: '0.8rem',
            fontWeight: 600,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem'
          }}
        >
          {viewingFix ? <ShieldCheck size={14} /> : <RotateCcw size={14} />}
          {viewingFix ? 'Viewing Solution' : 'Show Fix & Recovery'}
        </button>
      </div>

      {/* Scenario Pill Selector */}
      <div
        style={{
          display: 'flex',
          gap: '0.4rem',
          overflowX: 'auto',
          paddingBottom: '0.4rem',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
        }}
      >
        {FAILURE_SCENARIOS.map((s) => (
          <button
            key={s.id}
            onClick={() => handleSelect(s)}
            style={{
              padding: '0.35rem 0.65rem',
              borderRadius: '6px',
              fontSize: '0.75rem',
              fontWeight: selectedScenario.id === s.id ? 700 : 500,
              background: selectedScenario.id === s.id ? 'rgba(239, 68, 68, 0.2)' : 'rgba(255, 255, 255, 0.03)',
              border: `1px solid ${selectedScenario.id === s.id ? '#ef4444' : 'rgba(255, 255, 255, 0.08)'}`,
              color: selectedScenario.id === s.id ? '#fca5a5' : '#94a3b8',
              whiteSpace: 'nowrap',
              cursor: 'pointer'
            }}
          >
            {s.title}
          </button>
        ))}
      </div>

      {/* Main Analysis Stage */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(320px, 1fr) minmax(320px, 1fr)', gap: '1rem' }}>
        {/* Left: Terminal Error Output */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Terminal size={14} color="#f87171" />
            <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#f87171' }}>
              Simulated Terminal Output
            </span>
          </div>

          <div
            style={{
              background: '#030712',
              borderRadius: '6px',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              padding: '0.85rem',
              fontFamily: 'ui-monospace, monospace',
              fontSize: '0.75rem',
              lineHeight: 1.45,
              color: '#fca5a5',
              height: '180px',
              overflowY: 'auto',
              whiteSpace: 'pre-wrap'
            }}
          >
            {selectedScenario.errorOutput}
          </div>

          {/* Bad vs Fixed Code */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
            <span style={{ fontSize: '0.7rem', fontWeight: 600, color: viewingFix ? '#34d399' : '#f87171' }}>
              {viewingFix ? '✓ Corrected Configuration:' : '✗ Problematic Configuration:'}
            </span>
            <pre
              style={{
                background: '#090d16',
                border: `1px solid ${viewingFix ? 'rgba(16, 185, 129, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`,
                padding: '0.6rem',
                borderRadius: '6px',
                fontSize: '0.72rem',
                fontFamily: 'ui-monospace, monospace',
                margin: 0,
                color: viewingFix ? '#a7f3d0' : '#fca5a5',
                overflowX: 'auto'
              }}
            >
              {viewingFix ? selectedScenario.fixedCodeSnippet : selectedScenario.badCodeSnippet}
            </pre>
          </div>
        </div>

        {/* Right: The 5-Point Diagnostic Breakdown */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
          <div
            style={{
              background: 'rgba(15, 23, 42, 0.6)',
              borderRadius: '6px',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              padding: '0.75rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem'
            }}
          >
            <div>
              <div style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', color: '#f87171' }}>
                1. WHAT HAPPENED?
              </div>
              <div style={{ fontSize: '0.8rem', color: '#e2e8f0', marginTop: '0.15rem' }}>
                {selectedScenario.whatHappened}
              </div>
            </div>

            <div>
              <div style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', color: '#fbbf24' }}>
                2. WHY DID IT HAPPEN?
              </div>
              <div style={{ fontSize: '0.8rem', color: '#cbd5e1', marginTop: '0.15rem' }}>
                {selectedScenario.why}
              </div>
            </div>

            <div>
              <div style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', color: '#38bdf8' }}>
                3. HOW DO YOU KNOW?
              </div>
              <div style={{ fontSize: '0.8rem', color: '#cbd5e1', marginTop: '0.15rem' }}>
                {selectedScenario.howDoYouKnow}
              </div>
            </div>

            <div>
              <div style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', color: '#34d399' }}>
                4. HOW DO YOU FIX IT?
              </div>
              <div style={{ fontSize: '0.8rem', color: '#a7f3d0', marginTop: '0.15rem', fontWeight: 600 }}>
                {selectedScenario.howDoYouFixIt}
              </div>
            </div>

            <div>
              <div style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', color: '#c084fc' }}>
                5. HOW DO YOU PREVENT IT?
              </div>
              <div style={{ fontSize: '0.8rem', color: '#e9d5ff', marginTop: '0.15rem' }}>
                {selectedScenario.howDoYouPreventIt}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
