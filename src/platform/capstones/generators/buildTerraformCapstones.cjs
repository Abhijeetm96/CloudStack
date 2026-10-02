// Generator script for Terraform Capstones 01 through 10
const fs = require('fs');
const path = require('path');

const terraformCapstones = [
  {
    id: 'terraform-01',
    code: 'TERRAFORM-01',
    title: 'Basic Infrastructure Provisioning',
    academy: 'terraform',
    difficulty: 'Beginner',
    estimatedTime: '4-6 hours',
    technologies: ['Terraform CLI', 'HCL Syntax', 'Local / Docker Provider', 'Resource Declarations'],
    overview: 'Initialize a clean Terraform project, configure the local/docker provider, declare foundational compute/network resources in HCL, and execute the standard init, plan, and apply lifecycle.',
    tags: ['terraform', 'hcl', 'iac', 'init-plan-apply', 'docker-provider'],
    projectOverview: {
      projectName: 'Basic Infrastructure Provisioning',
      academy: 'terraform',
      difficulty: 'Beginner',
      estimatedEffort: '4-6 hours',
      technologies: ['Terraform CLI 1.5+', 'HashiCorp HCL', 'Docker or Local Provider'],
      shortDescription: 'Initialize and provision declarative infrastructure resources using HashiCorp Configuration Language (HCL) and the core Terraform CLI workflow.'
    },
    scenario: 'Your platform engineering team has committed to deprecating manual cloud console provisioning (ClickOps). As the newest infrastructure engineer, you have been assigned to construct your team\'s first version-controlled Terraform configuration, provisioning an isolated web service environment from declarative code.',
    problemStatement: 'Manual infrastructure provisioning creates undocumented configuration drift, cannot be peer-reviewed, and makes disaster recovery impossible. The team requires a standardized, version-controlled HCL codebase that can reliably provision infrastructure using automated execution commands.',
    projectObjective: [
      'Initialize a clean Terraform workspace using terraform init',
      'Declare required providers and provider configurations (kreuzwerker/docker or hashicorp/local)',
      'Declare network and container/compute resources using declarative HCL blocks',
      'Generate and inspect execution plans with terraform plan',
      'Apply changes to real infrastructure with terraform apply and verify state creation'
    ],
    whatYouNeedToBuild: {
      description: 'A declarative HCL infrastructure definition provisioning a dedicated virtual bridge network and an Nginx container serving a custom HTML landing page.',
      diagram: `[Terraform Configuration (main.tf)]
               │
      (terraform apply)
               │
               ▼
[Docker / Cloud Infrastructure]
├── Docker Network: [custom_bridge (172.28.0.0/16)]
└── Docker Container: [web_server (nginx:alpine)]
    ├── Published Port: 8080:80
    └── Attached to: custom_bridge`
    },
    requirements: {
      functional: [
        'Terraform must successfully provision the network and compute/container resources',
        'Nginx web server must be accessible from host at http://localhost:8080',
        'Running terraform apply again with no code changes must result in "No changes. Infrastructure is up-to-date."'
      ],
      technical: [
        'Write configuration in main.tf following HCL conventions',
        'Specify terraform required_version ">= 1.5.0"',
        'Configure required_providers block pinning provider version'
      ],
      security: [
        'Add .gitignore blocking .terraform/ directory, *.tfstate, and *.tfstate.backup',
        'Do not commit sensitive state files to public repositories'
      ]
    },
    architecture: {
      summary: 'Declarative Infrastructure as Code architecture translating HCL configuration into real provider API calls via state-driven execution graphs.',
      diagram: `HCL Manifest (main.tf) ──> DAG Dependency Graph ──> Provider Plugin (Docker/AWS) ──> Real Infrastructure`,
      components: [
        { name: 'HCL Resource Blocks', role: 'Declarative definitions of desired infrastructure target state', technologies: ['HCL2'] },
        { name: 'Terraform State Engine', role: 'State ledger (terraform.tfstate) mapping HCL identifiers to real resource IDs', technologies: ['JSON State'] },
        { name: 'Provider Plugin', role: 'gRPC binary plugin executing API calls against destination platform', technologies: ['Terraform Provider'] }
      ]
    },
    technologyRequirements: {
      required: ['Terraform CLI 1.5+', 'Docker Desktop or Docker Engine on Linux', 'Text editor'],
      optional: ['AWS CLI if deploying to cloud free-tier'],
      outOfScope: ['Terraform Cloud Enterprise workspaces', 'Kubernetes Helm operators']
    },
    functionalRequirements: [
      'Create main.tf configuring kreuzwerker/docker provider (or local file provider)',
      'Declare docker_network resource named "app_network"',
      'Declare docker_image resource pulling "nginx:alpine"',
      'Declare docker_container resource running Nginx and publishing port 8080',
      'Run terraform init, terraform plan, and terraform apply',
      'Verify container response via curl -I http://localhost:8080',
      'Run terraform destroy and confirm resources are cleanly removed'
    ],
    technicalRequirements: [
      'Format code using terraform fmt -check',
      'Validate configuration syntax using terraform validate',
      'Inspect generated state file with terraform show'
    ],
    securityRequirements: [
      'Ensure state file is excluded from Git tracking via .gitignore'
    ],
    constraints: [
      'Do not manually start or modify containers outside of Terraform',
      'All resources must be managed strictly through HCL'
    ],
    expectedOutcome: 'A repeatable, version-controlled Infrastructure as Code baseline capable of provisioning and destroying infrastructure deterministically in under 30 seconds.',
    deliverables: [
      'Complete main.tf configuration',
      '.gitignore file blocking state files',
      'TERRAFORM_BASELINE_REPORT.md detailing init, plan, apply, and destroy terminal logs'
    ],
    suggestedProjectStructure: `basic-infrastructure/
├── main.tf
├── .gitignore
├── README.md
└── TERRAFORM_BASELINE_REPORT.md`,
    requiredConcepts: [
      { name: 'What is Infrastructure as Code?', lessonId: 'ch-01', academyRoute: '/terraform' },
      { name: 'Terraform Architecture & Providers', lessonId: 'ch-02', academyRoute: '/terraform' },
      { name: 'HCL Syntax & Resources', lessonId: 'ch-03', academyRoute: '/terraform' },
      { name: 'Terraform State Management', lessonId: 'ch-07', academyRoute: '/terraform' }
    ],
    resources: {
      academyLessons: [
        { title: 'Chapter 01: Infrastructure as Code Fundamentals', route: '/cloudstack/terraform?concept=ch-01' },
        { title: 'Chapter 03: HCL Syntax & Resources', route: '/cloudstack/terraform?concept=ch-03' },
        { title: 'Chapter 07: Terraform State Core', route: '/cloudstack/terraform?concept=ch-07' }
      ],
      officialDocs: [
        { title: 'Terraform Language Documentation', url: 'https://developer.hashicorp.com/terraform/language' },
        { title: 'Docker Provider Documentation', url: 'https://registry.terraform.io/providers/kreuzwerker/docker/latest/docs' }
      ],
      referenceMaterial: ['Terraform: Up & Running Chapter 2 - Getting Started'],
      usefulCommands: [
        'terraform init',
        'terraform fmt',
        'terraform validate',
        'terraform plan',
        'terraform apply -auto-approve',
        'terraform show',
        'terraform destroy'
      ]
    },
    recommendedApproach: [
      '1. Create the project directory and author a comprehensive .gitignore.',
      '2. Author main.tf with the terraform block declaring required_providers.',
      '3. Execute terraform init to download the provider plugin binary.',
      '4. Declare the network resource in HCL.',
      '5. Declare the image and container resources, referencing the network via interpolation.',
      '6. Run terraform validate to ensure syntax is valid.',
      '7. Execute terraform plan to review proposed resource creation.',
      '8. Execute terraform apply to instantiate resources.',
      '9. Verify the running container using curl and docker ps.',
      '10. Execute terraform destroy to test clean teardown; author TERRAFORM_BASELINE_REPORT.md.'
    ],
    importantConsiderations: [
      'Why is the terraform.tfstate file considered the source of truth for managed infrastructure?',
      'What happens if a resource managed by Terraform is modified manually in the cloud console (drift)?',
      'Why must provider versions always be pinned using ~> or = in production code?'
    ],
    commonPitfalls: [
      'Committing terraform.tfstate to public Git repositories, exposing sensitive IP addresses or credentials.',
      'Modifying infrastructure directly in the cloud console, desynchronizing the state file.',
      'Forgetting to run terraform init after adding new providers in main.tf.'
    ],
    optionalEnhancements: {
      beginner: ['Add local-exec provisioner printing a completion message.'],
      intermediate: ['Create an index.html file and mount it into the container using host_path.'],
      advanced: ['Replace Docker provider with AWS VPC and EC2 resources using LocalStack.'],
      expert: ['Inspect the raw JSON graph representation using terraform graph | dot -Tpng.']
    },
    completionChecklist: [
      'Terraform workspace initialized with provider plugin installed',
      'HCL configuration authored and formatted with terraform fmt',
      'terraform validate confirms zero syntax errors',
      'Resources created via terraform apply',
      'Web service confirmed responsive at http://localhost:8080',
      'terraform state show verifies resource registration',
      'terraform destroy verifies clean resource removal',
      'TERRAFORM_BASELINE_REPORT.md published'
    ]
  },
  {
    id: 'terraform-02',
    code: 'TERRAFORM-02',
    title: 'Input Variables, Local Values and Structured Outputs',
    academy: 'terraform',
    difficulty: 'Beginner+',
    estimatedTime: '6-8 hours',
    technologies: ['Input Variables (tfvars)', 'Output Values', 'Local Values (locals)', 'Type Constraints', 'Validation Rules'],
    overview: 'Parametrize hardcoded infrastructure by implementing strongly-typed input variables, custom validation rules, local value transformations, and structured sensitive outputs.',
    tags: ['terraform', 'variables', 'outputs', 'locals', 'type-constraints', 'validation'],
    projectOverview: {
      projectName: 'Input Variables, Local Values and Structured Outputs',
      academy: 'terraform',
      difficulty: 'Beginner+',
      estimatedEffort: '6-8 hours',
      technologies: ['Terraform Variables', 'Output Values', 'HCL Type Constraints', 'terraform.tfvars'],
      shortDescription: 'Transform static hardcoded Terraform code into a dynamic, parameterized configuration using type-enforced variables, computed locals, and structured outputs.'
    },
    scenario: 'Your team needs to deploy the same infrastructure across three different regions with varying server sizing and port configurations. Currently, engineers copy-paste the entire main.tf file and manually edit hardcoded values, leading to syntax errors and configuration drift. You must refactor the codebase to use input variables and outputs.',
    problemStatement: 'Hardcoded infrastructure definitions cannot be reused across environments without duplicating code. Parameters like ports, instance counts, and environment tags must be externalized into variables with strict type constraints and validation rules.',
    projectObjective: [
      'Separate configuration into main.tf, variables.tf, and outputs.tf',
      'Define strongly-typed input variables (string, number, list, map, object) with sensible defaults and descriptions',
      'Implement custom variable validation blocks enforcing naming and port range restrictions',
      'Use local values (locals) to compute standardized resource tags and names',
      'Expose structured output values (including sensitive values) for downstream consumption'
    ],
    whatYouNeedToBuild: {
      description: 'A modular, parameterized Terraform configuration driven by external variable files producing formatted output data.',
      diagram: `[Input Variables (variables.tf & terraform.tfvars)]
├── app_port = 8080 (number, validation: 1024..65535)
├── environment = "staging" (string, validation: dev|staging|prod)
└── container_replicas = 2 (number)
                 │
                 ▼
[Local Computations (locals.tf)]
└── common_tags = { ManagedBy = "Terraform", Env = var.environment }
                 │
                 ▼ (terraform apply)
[Provisioned Resources] ──> [Structured Outputs (outputs.tf)]
                            ├── service_url = "http://localhost:8080"
                            └── connection_string = (sensitive = true)`
    },
    requirements: {
      functional: [
        'Infrastructure parameters must be completely configurable via variables.tf and terraform.tfvars',
        'Passing an invalid environment name (e.g. "testing") must fail immediately with a custom validation error',
        'Outputs must display the active service URL upon apply completion'
      ],
      technical: [
        'Enforce variable types: type = string, type = number, type = map(string)',
        'Implement validation { condition = ... error_message = ... } in variable definitions',
        'Mark sensitive credentials with sensitive = true in outputs.tf'
      ],
      security: [
        'Verify sensitive outputs are masked by default in CLI output',
        'Do not commit real production secret variables into public Git repos'
      ]
    },
    architecture: {
      summary: 'Data flow architecture separating variable parameter ingress, local expression computation, resource interpolation, and output export.',
      diagram: `Variable Definitions ──> Local Transformations ──> Resource Interpolation (var.*, local.*) ──> Outputs`,
      components: [
        { name: 'variables.tf', role: 'Public API contract defining parameter types, defaults, and validation rules', technologies: ['HCL Variables'] },
        { name: 'locals.tf', role: 'Internal computed expressions reducing DRY duplication', technologies: ['HCL Locals'] },
        { name: 'outputs.tf', role: 'Exported return values providing endpoints and metadata to operators', technologies: ['HCL Outputs'] }
      ]
    },
    technologyRequirements: {
      required: ['Terraform CLI 1.5+', 'Docker or Local Provider'],
      optional: ['tfvars files for multiple environments (dev.tfvars, prod.tfvars)'],
      outOfScope: ['Complex remote state data source lookups']
    },
    functionalRequirements: [
      'Define variable app_port with number type and validation ensuring port > 1024',
      'Define variable environment with validation allowing only "dev", "staging", or "prod"',
      'Compute local.name_prefix combining project name and environment',
      'Define outputs: public_url, container_id, and database_password (marked sensitive)',
      'Create dev.tfvars and prod.tfvars specifying distinct port numbers',
      'Run terraform apply -var-file=dev.tfvars and inspect formatted outputs',
      'Verify sensitive output masking: terraform output masks the password unless explicitly queried with -raw'
    ],
    technicalRequirements: [
      'Test variable validation: run with -var="environment=invalid" and confirm error message triggers',
      'Verify all outputs with terraform output -json'
    ],
    securityRequirements: [
      'Ensure terraform.tfvars containing real passwords is added to .gitignore'
    ],
    constraints: [
      'Zero hardcoded strings or numbers inside resource blocks in main.tf',
      'All variables must include a description field'
    ],
    expectedOutcome: 'A fully parameterized, validated Terraform project capable of targeting multiple environments through external configuration files.',
    deliverables: [
      'main.tf, variables.tf, locals.tf, and outputs.tf files',
      'dev.tfvars and prod.tfvars parameter files',
      '.env.example / terraform.tfvars.example',
      'VARIABLE_DESIGN_SPEC.md detailing validation rules and output schema'
    ],
    suggestedProjectStructure: `parameterized-infra/
├── main.tf
├── variables.tf
├── locals.tf
├── outputs.tf
├── dev.tfvars
├── prod.tfvars
├── terraform.tfvars.example
└── VARIABLE_DESIGN_SPEC.md`,
    requiredConcepts: [
      { name: 'Input Variables & Validation', lessonId: 'ch-04', academyRoute: '/terraform' },
      { name: 'Outputs & Data Flow', lessonId: 'ch-05', academyRoute: '/terraform' },
      { name: 'Local Values & Expressions', lessonId: 'ch-06', academyRoute: '/terraform' }
    ],
    resources: {
      academyLessons: [
        { title: 'Chapter 04: Input Variables & Types', route: '/cloudstack/terraform?concept=ch-04' },
        { title: 'Chapter 05: Output Values & Data Flow', route: '/cloudstack/terraform?concept=ch-05' },
        { title: 'Chapter 06: Local Values & Built-in Functions', route: '/cloudstack/terraform?concept=ch-06' }
      ],
      officialDocs: [
        { title: 'Terraform Input Variables', url: 'https://developer.hashicorp.com/terraform/language/values/variables' },
        { title: 'Custom Variable Validation', url: 'https://developer.hashicorp.com/terraform/language/values/variables#custom-validation-rules' }
      ],
      referenceMaterial: ['Terraform Best Practices - Structuring Variables'],
      usefulCommands: [
        'terraform plan -var-file=dev.tfvars',
        'terraform apply -var-file=dev.tfvars -auto-approve',
        'terraform output',
        'terraform output -raw database_password',
        'terraform output -json'
      ]
    },
    recommendedApproach: [
      '1. Review existing hardcoded resource blocks and identify values that vary across environments.',
      '2. Create variables.tf declaring input variables with type constraints and descriptions.',
      '3. Add custom validation blocks to variables enforcing naming conventions and port boundaries.',
      '4. Create locals.tf to calculate composite names and standardized tags.',
      '5. Refactor main.tf to replace hardcoded values with var.<name> and local.<name>.',
      '6. Create outputs.tf exporting critical endpoints, marking sensitive fields appropriately.',
      '7. Create dev.tfvars and prod.tfvars files with environment-specific values.',
      '8. Test invalid variable values and verify that custom error messages trigger properly.',
      '9. Apply using -var-file=dev.tfvars and verify formatted output values.',
      '10. Document all variables and outputs in VARIABLE_DESIGN_SPEC.md.'
    ],
    importantConsiderations: [
      'How does the variable definition precedence hierarchy work in Terraform (CLI args > tfvars > env vars > defaults)?',
      'Why is marking an output sensitive important if the value still exists in plaintext inside terraform.tfstate?',
      'When should an engineer use local values instead of input variables?'
    ],
    commonPitfalls: [
      'Committing *.tfvars files containing production passwords to public version control.',
      'Omitting type constraints, allowing unexpected data types to cause cryptic errors deep in provider calls.',
      'Creating redundant local variables that simply mirror an input variable without adding logic.'
    ],
    optionalEnhancements: {
      beginner: ['Use built-in HCL functions like lower(), format(), and merge() inside locals.'],
      intermediate: ['Create an object variable with complex nested schema (e.g. database configuration map).'],
      advanced: ['Implement cross-variable validation using preconditions inside resource lifecycle blocks.'],
      expert: ['Generate automated markdown documentation for all variables and outputs using terraform-docs.']
    },
    completionChecklist: [
      'Variables separated into variables.tf with strict types and descriptions',
      'Custom validation blocks implemented and tested failing on invalid input',
      'Locals computed in locals.tf and used in main.tf',
      'Outputs defined in outputs.tf with sensitive fields protected',
      'dev.tfvars and prod.tfvars files created and tested',
      'terraform output outputs inspected in both human and JSON format',
      'VARIABLE_DESIGN_SPEC.md published'
    ]
  }
];

// Append remaining 8 projects for Terraform (03 to 10)
const remainingTerraformCapstones = [
  {
    id: 'terraform-03',
    code: 'TERRAFORM-03',
    title: 'Reusable Infrastructure with Loops and Conditionals',
    academy: 'terraform',
    difficulty: 'Lower Intermediate',
    estimatedTime: '8-10 hours',
    technologies: ['count Meta-argument', 'for_each Meta-argument', 'for Expressions', 'Dynamic Blocks', 'Ternary Conditionals'],
    overview: 'Construct dynamic, data-driven infrastructure configurations using Terraform meta-arguments (count, for_each), ternary conditionals, splat expressions (*), and dynamic nested blocks.',
    tags: ['terraform', 'loops', 'for_each', 'count', 'dynamic-blocks', 'conditionals'],
    projectOverview: {
      projectName: 'Reusable Infrastructure with Loops and Conditionals',
      academy: 'terraform',
      difficulty: 'Lower Intermediate',
      estimatedEffort: '8-10 hours',
      technologies: ['for_each', 'count', 'Dynamic Blocks', 'Ternary Conditionals'],
      shortDescription: 'Build dynamic, scalable infrastructure using Terraform loops (for_each, count), conditional resource toggles, and dynamic block generation.'
    },
    scenario: 'Your security team has requested firewall rules and storage buckets for 5 different microservices. Writing 5 identical resource blocks creates 150 lines of duplicate code that is difficult to maintain. You must refactor the codebase to use map-driven for_each loops, conditional resource toggles, and dynamic nested blocks.',
    problemStatement: 'Copy-pasting resource blocks creates massive code duplication and maintenance nightmares. Infrastructure configurations must be data-driven: adding or removing a service should require only adding an entry to a map, not writing new resource blocks.',
    projectObjective: [
      'Deploy multiple resources dynamically using the for_each meta-argument over maps and sets',
      'Implement conditional resource creation using ternary operators (condition ? true_val : false_val)',
      'Construct complex nested configurations using dynamic blocks and content blocks',
      'Transform collections using for expressions and collect output lists using splat operators (*)'
    ],
    whatYouNeedToBuild: {
      description: 'A data-driven infrastructure configuration generating multiple isolated services from a single parameterized map with conditional monitoring features.',
      diagram: `[Input Map: var.services]
├── "auth"    ──> { port = 8081, enable_monitoring = true }
├── "billing" ──> { port = 8082, enable_monitoring = false }
└── "orders"  ──> { port = 8083, enable_monitoring = true }
                 │
                 ▼ (for_each = var.services)
[Generated Infrastructure Resources]
├── Container: auth-service (Port 8081) ──> Monitoring Sidecar (ACTIVE)
├── Container: billing-service (Port 8082) ──> (Monitoring SKIPPED via conditional)
└── Container: orders-service (Port 8083) ──> Monitoring Sidecar (ACTIVE)`
    },
    requirements: {
      functional: [
        'Adding a new service entry to var.services must automatically provision a new container upon apply',
        'Services with enable_monitoring = true must provision a companion monitoring sidecar; others must not',
        'Outputs must produce a consolidated map mapping each service name to its assigned endpoint URL'
      ],
      technical: [
        'Use for_each over maps to ensure stable resource keys (avoid count index shifting)',
        'Use ternary conditional count = var.enable_monitoring ? 1 : 0',
        'Generate output map using for expression: { for k, v in ... => v.endpoint }'
      ],
      security: [
        'Ensure dynamic port allocations do not expose unapproved privileged ports'
      ]
    },
    architecture: {
      summary: 'Data-driven resource compilation architecture converting input maps and sets into dynamic execution graph nodes with conditional inclusion branches.',
      diagram: `Map Definition ──> for_each Iterator ──> [Key-Addressable Resources] ──> for Expression Map Output`,
      components: [
        { name: 'for_each Meta-argument', role: 'Instantiates multiple resource instances identified by stable map keys', technologies: ['HCL Engine'] },
        { name: 'Ternary Conditional', role: 'Selects values or enables/disables resources based on boolean evaluation', technologies: ['HCL Expressions'] },
        { name: 'dynamic block', role: 'Generates repeated nested configuration blocks dynamically from collections', technologies: ['HCL Dynamic Blocks'] }
      ]
    },
    technologyRequirements: {
      required: ['Terraform CLI 1.5+', 'Docker or Cloud Provider'],
      optional: ['LocalStack AWS provider'],
      outOfScope: ['Full Terraform Registry module publishing']
    },
    functionalRequirements: [
      'Define map variable services with 3 service definitions (name, port, enable_metrics)',
      'Use for_each = var.services to create compute/container instances',
      'Use conditional to launch metrics sidecar only when enable_metrics is true',
      'Use dynamic block to generate custom environment variables or port bindings',
      'Author output producing { for k, v in docker_container.app : k => "http://localhost:${v.ports[0].external}" }',
      'Add a 4th service to the map and execute terraform apply to verify atomic addition'
    ],
    technicalRequirements: [
      'Demonstrate resource addressing: terraform state show \'docker_container.app["auth"]\'',
      'Demonstrate safe removal: delete one service from map and verify only that single resource is destroyed'
    ],
    securityRequirements: [
      'Ensure sidecar containers run as unprivileged users'
    ],
    constraints: [
      'Do not use count for collections where items might be inserted or removed from the middle of the list (to avoid index shift cascade)',
      'Do not hardcode duplicated resource blocks'
    ],
    expectedOutcome: 'A scalable, dry, data-driven Terraform configuration where services and nested blocks scale dynamically from configuration data structures.',
    deliverables: [
      'Refactored main.tf utilizing for_each, conditionals, and dynamic blocks',
      'variables.tf with map and object schema definitions',
      'DATA_DRIVEN_INFRA_REPORT.md demonstrating dynamic additions, resource addressing, and safe deletions'
    ],
    suggestedProjectStructure: `data-driven-infra/
├── main.tf
├── variables.tf
├── outputs.tf
├── services.tfvars
└── DATA_DRIVEN_INFRA_REPORT.md`,
    requiredConcepts: [
      { name: 'Meta-arguments: count & for_each', lessonId: 'ch-03', academyRoute: '/terraform' },
      { name: 'HCL Functions & Expressions', lessonId: 'ch-06', academyRoute: '/terraform' },
      { name: 'Dynamic Blocks', lessonId: 'ch-06', academyRoute: '/terraform' }
    ],
    resources: {
      academyLessons: [
        { title: 'Chapter 03: Meta-arguments (for_each & count)', route: '/cloudstack/terraform?concept=ch-03' },
        { title: 'Chapter 06: Built-in Functions & Expressions', route: '/cloudstack/terraform?concept=ch-06' }
      ],
      officialDocs: [
        { title: 'The for_each Meta-Argument', url: 'https://developer.hashicorp.com/terraform/language/meta-arguments/for_each' },
        { title: 'Dynamic Blocks', url: 'https://developer.hashicorp.com/terraform/language/expressions/dynamic-blocks' }
      ],
      referenceMaterial: ['HashiCorp Guide: When to Use count vs for_each'],
      usefulCommands: [
        'terraform plan -var-file=services.tfvars',
        'terraform state list',
        'terraform state show \'docker_container.service["auth"]\''
      ]
    },
    recommendedApproach: [
      '1. Design the map schema representing the services and their configuration options.',
      '2. Define the services variable with map(object({...})) type constraints.',
      '3. Refactor main resource blocks to use for_each = var.services.',
      '4. Implement conditional logic to create monitoring sidecars only when requested.',
      '5. Implement a dynamic block to construct repeated environment variable lists.',
      '6. Create outputs using for expressions to compile a consolidated endpoint directory.',
      '7. Execute terraform apply and verify all services instantiate properly.',
      '8. Inspect the state list to observe key-addressable resource syntax (resource["key"]).',
      '9. Add a new service to the map and verify Terraform only adds 1 resource without modifying existing ones.',
      '10. Author DATA_DRIVEN_INFRA_REPORT.md.'
    ],
    importantConsiderations: [
      'Why does using count with a list cause destructive recreation when an item is removed from the middle of the list?',
      'How does for_each solve the index-shifting problem by indexing resources by stable map keys?',
      'When are dynamic blocks appropriate, and why should they be used sparingly to avoid unreadable code?'
    ],
    commonPitfalls: [
      'Using for_each with a list of strings without converting to a set using toset().',
      'Attempting to use for_each on a resource whose keys are only known after apply (computed values).',
      'Over-complicating configurations with deeply nested dynamic blocks that resemble imperative code.'
    ],
    optionalEnhancements: {
      beginner: ['Use the coalesce() function to provide fallback values.'],
      intermediate: ['Create a local value that filters the service map to only active services using for expressions.'],
      advanced: ['Implement complex validation checking that all service ports are mutually unique.'],
      expert: ['Construct a multi-tier dynamic block generating complex firewall rule sets.']
    },
    completionChecklist: [
      'Map variable defined with strongly typed object structure',
      'for_each implemented creating key-addressable resources',
      'Ternary conditional creates sidecars only for enabled services',
      'dynamic block generates repeated nested configurations cleanly',
      'Consolidated output map generated using HCL for expression',
      'Resource addition and removal verified without index shifting',
      'DATA_DRIVEN_INFRA_REPORT.md published'
    ]
  },
  {
    id: 'terraform-04',
    code: 'TERRAFORM-04',
    title: 'Modular Infrastructure Architecture & Custom Modules',
    academy: 'terraform',
    difficulty: 'Intermediate',
    estimatedTime: '8-12 hours',
    technologies: ['Terraform Modules', 'Module Inputs / Outputs', 'Root Module vs Child Module', 'Local Modules', 'Module Versioning'],
    overview: 'Design, package, and consume reusable, encapsulated Terraform child modules, establishing clean architectural interfaces, input abstractions, output propagation, and module versioning.',
    tags: ['terraform', 'modules', 'encapsulation', 'reusability', 'child-modules', 'architecture'],
    projectOverview: {
      projectName: 'Modular Infrastructure Architecture & Custom Modules',
      academy: 'terraform',
      difficulty: 'Intermediate',
      estimatedEffort: '8-12 hours',
      technologies: ['Terraform Modules', 'Root Module', 'Child Modules', 'Module Composition'],
      shortDescription: 'Architect and deploy encapsulated, reusable Terraform child modules with public input contracts, private implementations, and exported outputs.'
    },
    scenario: 'Your organization has 12 development squads. Each squad is writing their own raw Terraform code to deploy web applications and databases, leading to wildly inconsistent architectures, unapproved firewall configurations, and massive duplication. You have been tasked with building standardized, reusable Terraform child modules.',
    problemStatement: 'Writing all infrastructure in a monolithic root module makes code unmaintainable and prevents reuse across teams. Platform engineering requires building encapsulated, standardized modules (e.g. web-app module) that application teams can instantiate with 5 lines of code.',
    projectObjective: [
      'Design and construct a reusable child module (modules/containerized-service/)',
      'Expose a minimal, clean public interface via module variables (variables.tf)',
      'Encapsulate complex internal resources (networking, volumes, security tags, healthchecks)',
      'Instantiate the module multiple times from a root module with different configurations',
      'Propagate internal child module resource attributes through module outputs'
    ],
    whatYouNeedToBuild: {
      description: 'A modular Terraform codebase where a root module instantiates two distinct environments using an encapsulated child module.',
      diagram: `Root Module (main.tf)
├── module "frontend" ──> Source: ./modules/containerized-service
│   ├── image = "nginx:alpine"
│   └── host_port = 8080
│
└── module "api" ──> Source: ./modules/containerized-service
    ├── image = "node-api:latest"
    └── host_port = 3000
                 │
                 ▼
[Encapsulated Child Module (modules/containerized-service/)]
├── Creates Docker Network
├── Provisions Container with Hardened Non-Root User
├── Configures Named Storage Volume
└── Exports: service_endpoint, container_id`
    },
    requirements: {
      functional: [
        'Root module must instantiate frontend and api services using the same child module',
        'Both services must run independently with isolated ports and network attachments',
        'Modifying child module internal implementation must update both services without changing root module inputs'
      ],
      technical: [
        'Organize child module with dedicated main.tf, variables.tf, and outputs.tf in modules/ directory',
        'Root module must reference child via source = "./modules/containerized-service"',
        'Execute terraform get or terraform init to load modules'
      ],
      security: [
        'Child module must enforce default security guardrails (non-root execution, dropped capabilities) that consumers cannot easily bypass'
      ]
    },
    architecture: {
      summary: 'Hierarchical module composition architecture separating high-level orchestration (root module) from low-level resource provisioning (child modules).',
      diagram: `Root Module Orchestrator ──(Inputs)──> Child Module Abstraction ──(State & Resources)──> Providers`,
      components: [
        { name: 'Root Module', role: 'Top-level working directory defining environment targets and module calls', technologies: ['Terraform Root'] },
        { name: 'Child Module', role: 'Reusable, self-contained package of infrastructure resources', technologies: ['Terraform Child Module'] },
        { name: 'Module Output Channel', role: 'Cross-module data pipeline exposing internal resource IDs to root callers', technologies: ['Module Outputs'] }
      ]
    },
    technologyRequirements: {
      required: ['Terraform CLI 1.5+', 'Docker or Cloud Provider'],
      optional: ['terraform-docs for generating automated module documentation'],
      outOfScope: ['Private Terraform Cloud Module Registry']
    },
    functionalRequirements: [
      'Create child module in modules/containerized-service/',
      'Child module defines: docker_image, docker_container, and optional docker_volume',
      'Child module exposes inputs: service_name, image_name, container_port, host_port, environment',
      'Child module outputs: container_id, network_ip, and public_url',
      'In root main.tf, instantiate module "web" and module "api"',
      'Run terraform init, terraform plan, and terraform apply',
      'Verify both services function simultaneously on their respective ports'
    ],
    technicalRequirements: [
      'Verify module state addressing: terraform state list shows module.web.* and module.api.*',
      'Generate README.md for the child module using terraform-docs or manual markdown'
    ],
    securityRequirements: [
      'Ensure child module validates port inputs and sets standard security tags'
    ],
    constraints: [
      'Never define provider blocks inside reusable child modules (providers must be configured in root)',
      'Do not reference root variables directly from child modules (must be passed explicitly as inputs)'
    ],
    expectedOutcome: 'A standardized, modular Terraform codebase establishing DRY reusability, consistent infrastructure standards, and encapsulated complexity.',
    deliverables: [
      'Child module: modules/containerized-service/{main.tf, variables.tf, outputs.tf, README.md}',
      'Root module: {main.tf, variables.tf, outputs.tf}',
      'MODULE_ARCHITECTURE_GUIDE.md detailing module design principles and interface specifications'
    ],
    suggestedProjectStructure: `modular-platform/
├── main.tf (Root)
├── variables.tf (Root)
├── outputs.tf (Root)
├── modules/
│   └── containerized-service/
│       ├── main.tf
│       ├── variables.tf
│       ├── outputs.tf
│       └── README.md
└── MODULE_ARCHITECTURE_GUIDE.md`,
    requiredConcepts: [
      { name: 'Terraform Modules & Composition', lessonId: 'ch-08', academyRoute: '/terraform' },
      { name: 'Module Sources & Versioning', lessonId: 'ch-09', academyRoute: '/terraform' },
      { name: 'HCL Syntax & Resources', lessonId: 'ch-03', academyRoute: '/terraform' }
    ],
    resources: {
      academyLessons: [
        { title: 'Chapter 08: Modules & Code Composition', route: '/cloudstack/terraform?concept=ch-08' },
        { title: 'Chapter 09: Module Sources & Registry', route: '/cloudstack/terraform?concept=ch-09' }
      ],
      officialDocs: [
        { title: 'Terraform Modules Overview', url: 'https://developer.hashicorp.com/terraform/language/modules' },
        { title: 'Module Creation Best Practices', url: 'https://developer.hashicorp.com/terraform/language/modules/develop' }
      ],
      referenceMaterial: ['HashiCorp Terraform Standard Module Structure'],
      usefulCommands: [
        'terraform init',
        'terraform get -update',
        'terraform plan',
        'terraform state list'
      ]
    },
    recommendedApproach: [
      '1. Identify common infrastructure patterns suitable for module extraction.',
      '2. Create the child module directory structure in modules/containerized-service/.',
      '3. Define the public input interface in modules/containerized-service/variables.tf.',
      '4. Author resource blocks in modules/containerized-service/main.tf.',
      '5. Define exported outputs in modules/containerized-service/outputs.tf.',
      '6. In root main.tf, instantiate the child module for the frontend web service.',
      '7. In root main.tf, instantiate the child module for the backend API service.',
      '8. Run terraform init to register the local module sources.',
      '9. Execute terraform apply and verify both module instances provision correctly.',
      '10. Author MODULE_ARCHITECTURE_GUIDE.md detailing module design standards.'
    ],
    importantConsiderations: [
      'Why should provider blocks NEVER be declared inside reusable child modules?',
      'How does module encapsulation enforce architectural standards across multiple engineering teams?',
      'What is the difference between a local file module source (./modules/...) and a Git-based module source?'
    ],
    commonPitfalls: [
      'Defining provider configurations inside child modules, breaking module reusability and inheritance.',
      'Creating overly generic "monolithic modules" with hundreds of variables that defeat the purpose of abstraction.',
      'Forgetting to run terraform get or terraform init after adding a new module block.'
    ],
    optionalEnhancements: {
      beginner: ['Add count or for_each to a module block to deploy multiple module instances from a list.'],
      intermediate: ['Publish the module to a private Git repository and reference it via Git tag version (source = "git::...").'],
      advanced: ['Implement custom pre-condition and post-condition checks inside the module.'],
      expert: ['Write automated integration tests for the module using the native terraform test framework.']
    },
    completionChecklist: [
      'Child module created adhering to standard module directory structure',
      'Child module variables.tf and outputs.tf defined with types and descriptions',
      'Zero provider blocks inside child module verified',
      'Root module instantiates child module multiple times',
      'terraform init successfully registers module sources',
      'terraform apply provisions both module instances cleanly',
      'terraform state list confirms module.web and module.api addressing',
      'MODULE_ARCHITECTURE_GUIDE.md published'
    ]
  },
  {
    id: 'terraform-05',
    code: 'TERRAFORM-05',
    title: 'Multi-Environment Infrastructure (Workspaces vs. Directory Separation)',
    academy: 'terraform',
    difficulty: 'Intermediate+',
    estimatedTime: '10-14 hours',
    technologies: ['Terraform Workspaces', 'Directory-based Environments', 'Environment Isolation', 'Backend Key Segregation'],
    overview: 'Architect and compare the two primary enterprise multi-environment patterns in Terraform: Workspaces vs. Directory-based separation (dev, staging, prod), evaluating blast radius, state isolation, and code reuse.',
    tags: ['terraform', 'workspaces', 'environments', 'blast-radius', 'directory-structure', 'multi-env'],
    projectOverview: {
      projectName: 'Multi-Environment Infrastructure (Workspaces vs. Directory Separation)',
      academy: 'terraform',
      difficulty: 'Intermediate+',
      estimatedEffort: '10-14 hours',
      technologies: ['Terraform Workspaces', 'Directory Separation', 'Remote State Isolation', 'Blast Radius Control'],
      shortDescription: 'Construct parallel implementations of Terraform Workspaces and Directory-based environment separation, conducting an architectural evaluation of isolation and blast radius.'
    },
    scenario: 'Your organization currently uses a single Terraform state file for all environments. Yesterday, an engineer testing a database change in dev accidentally altered production because both environments shared the same state file. You must re-architect the platform to guarantee absolute state separation between Dev, Staging, and Production.',
    problemStatement: 'Sharing state files across environments creates catastrophic blast radius risks: a typo in dev can destroy production. Two architectural patterns exist—Terraform Workspaces (single codebase, multiple state keys) vs Directory Separation (isolated folders per environment). You must build and evaluate both models.',
    projectObjective: [
      'Implement Environment Pattern A: Terraform Workspaces (terraform workspace new dev/stage/prod)',
      'Implement Environment Pattern B: Directory-based separation (environments/dev, environments/staging, environments/prod)',
      'Deploy distinct infrastructure tiers across both models with isolated state storage',
      'Evaluate trade-offs in blast radius, configuration drift, code duplication, and CI/CD compatibility in an Architectural Decision Record (ADR)'
    ],
    whatYouNeedToBuild: {
      description: 'Two prototype infrastructure repository structures demonstrating Workspaces and Directory-based separation respectively.',
      diagram: `Pattern A: Terraform Workspaces (Shared Code, Multi-State)
codebase/ ──(terraform.workspace: dev|stage|prod)──> [State: dev.tfstate] | [State: prod.tfstate]

Pattern B: Directory Separation (Isolated Code & State, Minimal Blast Radius)
environments/
├── dev/        ──(Dedicated Backend Key: dev/terraform.tfstate)   ──> [Isolated Dev Cloud]
├── staging/    ──(Dedicated Backend Key: stage/terraform.tfstate) ──> [Isolated Stage Cloud]
└── production/ ──(Dedicated Backend Key: prod/terraform.tfstate)  ──> [Isolated Prod Cloud]`
    },
    requirements: {
      functional: [
        'Modifications in the Development environment must have zero impact on Staging or Production',
        'Each environment must possess an independent state file with dedicated state locking',
        'Production must enforce stricter configuration parameters (larger sizing, redundancy) than Dev'
      ],
      technical: [
        'In Workspaces model, use terraform.workspace interpolation for names and sizing lookup maps',
        'In Directory model, instantiate shared modules from ../../modules/ with environment-specific tfvars',
        'Demonstrate switching workspaces and inspecting state files'
      ],
      security: [
        'Directory model must support separate IAM access policies so junior devs lack access to production/'
      ]
    },
    architecture: {
      summary: 'Comparative architectural evaluation of multi-environment state management isolating risk domains and blast radius.',
      diagram: `Single Workspace (High Blast Radius) VS Segregated Directory Backends (Zero Cross-Environment Blast Radius)`,
      components: [
        { name: 'Terraform Workspaces', role: 'Single HCL code tree mapping to distinct state file paths within the same backend', technologies: ['terraform workspace'] },
        { name: 'Directory Separation', role: 'Independent root modules per environment sharing common child modules', technologies: ['File System'] },
        { name: 'State Key Segregation', role: 'Distinct S3/GCS object paths isolating state locks per environment', technologies: ['Backend Keys'] }
      ]
    },
    technologyRequirements: {
      required: ['Terraform CLI 1.5+', 'Docker or Cloud Provider'],
      optional: ['AWS S3 backend or local backend with multiple directories'],
      outOfScope: ['Terragrunt orchestration tool (covered in DEVOPS-10)']
    },
    functionalRequirements: [
      'Create workspace-pattern/ directory with single main.tf using lookup(var.env_sizing, terraform.workspace)',
      'Create workspaces: dev, staging, prod; deploy instances in dev and staging',
      'Create directory-pattern/ with environments/dev and environments/prod sharing modules/service',
      'Deploy dev and prod in directory pattern; verify state files reside in separate directories',
      'Simulate state corruption in dev: verify production in directory model is completely unharmed',
      'Author ADR-002-MULTI-ENVIRONMENT-STRATEGY.md detailing findings'
    ],
    technicalRequirements: [
      'Demonstrate workspace CLI commands: terraform workspace list, select, new',
      'Inspect independent state lists in both environments'
    ],
    securityRequirements: [
      'Audit access control: confirm directory separation allows different AWS IAM roles per folder'
    ],
    constraints: [
      'Never share a single state file between development and production',
      'Do not use workspaces for environments that have fundamentally different infrastructure topologies'
    ],
    expectedOutcome: 'A comprehensive, evidence-based architectural comparison of Terraform environment separation strategies, equipping your team to implement zero-blast-radius infrastructure.',
    deliverables: [
      'Workspace implementation prototype',
      'Directory separation implementation prototype',
      'ADR-002-MULTI-ENVIRONMENT-STRATEGY.md analyzing blast radius, code drift, and CI/CD automation'
    ],
    suggestedProjectStructure: `multi-environment-benchmark/
├── workspace-model/
│   ├── main.tf
│   └── variables.tf
├── directory-model/
│   ├── modules/service/
│   └── environments/
│       ├── dev/
│       │   ├── main.tf
│       │   └── terraform.tfvars
│       └── prod/
│           ├── main.tf
│           └── terraform.tfvars
└── ADR-002-MULTI-ENVIRONMENT-STRATEGY.md`,
    requiredConcepts: [
      { name: 'Terraform Workspaces', lessonId: 'ch-11', academyRoute: '/terraform' },
      { name: 'Multi-Environment Architecture', lessonId: 'ch-12', academyRoute: '/terraform' },
      { name: 'Terraform State Management', lessonId: 'ch-07', academyRoute: '/terraform' },
      { name: 'Terraform Modules', lessonId: 'ch-08', academyRoute: '/terraform' }
    ],
    resources: {
      academyLessons: [
        { title: 'Chapter 11: Terraform Workspaces', route: '/cloudstack/terraform?concept=ch-11' },
        { title: 'Chapter 12: Multi-Environment Architectures', route: '/cloudstack/terraform?concept=ch-12' },
        { title: 'Chapter 07: Terraform State & Backends', route: '/cloudstack/terraform?concept=ch-07' }
      ],
      officialDocs: [
        { title: 'When to use Multiple Workspaces', url: 'https://developer.hashicorp.com/terraform/language/state/workspaces#when-to-use-multiple-workspaces' },
        { title: 'Terraform Recommended Practices', url: 'https://developer.hashicorp.com/terraform/cloud-docs/recommended-practices' }
      ],
      referenceMaterial: ['Terraform Up & Running: Chapter 3 - How to Manage Terraform State'],
      usefulCommands: [
        'terraform workspace new dev',
        'terraform workspace select prod',
        'terraform workspace list',
        'terraform workspace show'
      ]
    },
    recommendedApproach: [
      '1. Review enterprise multi-environment requirements and blast radius considerations.',
      '2. Build Prototype 1 using Terraform Workspaces and terraform.workspace interpolation.',
      '3. Test deploying dev and staging in Prototype 1; observe state file behavior.',
      '4. Build Prototype 2 using Directory Separation with environments/dev and environments/prod.',
      '5. Extract common infrastructure into a shared modules/service directory.',
      '6. Deploy dev and prod in Prototype 2 and verify separate state files.',
      '7. Compare how CI/CD pipelines authenticate and execute against both patterns.',
      '8. Evaluate RBAC capabilities: can junior engineers be blocked from prod in both models?',
      '9. Compile pros, cons, and recommendations into ADR-002.',
      '10. Present findings in ADR-002-MULTI-ENVIRONMENT-STRATEGY.md.'
    ],
    importantConsiderations: [
      'Why does HashiCorp explicitly advise against using Workspaces to separate Dev from Production?',
      'How does directory separation provide physical file separation for IAM credential isolation in CI/CD?',
      'What are the code duplication trade-offs of directory separation, and how do shared modules mitigate them?'
    ],
    commonPitfalls: [
      'Forgetting which workspace is active and running terraform apply thinking you are in dev when in prod.',
      'Using workspaces when dev and prod require fundamentally different resources (e.g. single instance vs multi-AZ cluster).',
      'Copy-pasting 500 lines of resource code between dev and prod folders instead of using shared modules.'
    ],
    optionalEnhancements: {
      beginner: ['Configure customized shell prompt displaying current active Terraform workspace.'],
      intermediate: ['Implement automated workspace cleanup script deleting ephemeral dev branches.'],
      advanced: ['Configure remote S3 backends with distinct DynamoDB state lock tables per environment.'],
      expert: ['Evaluate Terragrunt DRY architecture as an alternative to pure directory separation.']
    },
    completionChecklist: [
      'Prototype 1 (Workspaces) created and tested across dev and prod',
      'Prototype 2 (Directory Separation) created and tested across dev and prod',
      'Shared child module implemented eliminating duplication in Directory model',
      'Independent state files verified for all environments',
      'Blast radius simulation demonstrates zero cross-environment contamination',
      'IAM access isolation evaluated across both approaches',
      'ADR-002-MULTI-ENVIRONMENT-STRATEGY.md authored with trade-off matrix'
    ]
  },
  {
    id: 'terraform-06',
    code: 'TERRAFORM-06',
    title: 'Remote State Management, Locking & Team Collaboration',
    academy: 'terraform',
    difficulty: 'Advanced',
    estimatedTime: '10-14 hours',
    technologies: ['Remote State Backends', 'State Locking', 'S3 & DynamoDB', 'State Migration', 'State Surgery (state rm / mv / import)'],
    overview: 'Design, configure, migrate, and operate enterprise remote state backends featuring distributed state locking, encryption at rest, team collaboration guardrails, and surgical state operations (mv, rm, import).',
    tags: ['terraform', 'remote-state', 's3-backend', 'state-locking', 'dynamodb', 'state-surgery'],
    projectOverview: {
      projectName: 'Remote State Management, Locking & Team Collaboration',
      academy: 'terraform',
      difficulty: 'Advanced',
      estimatedEffort: '10-14 hours',
      technologies: ['Remote Backends', 'State Locking', 'State Migration', 'State Surgery'],
      shortDescription: 'Migrate local state to an enterprise remote backend with distributed state locking, and perform live state surgery (import, move, remove).'
    },
    scenario: 'Two engineers on your team ran "terraform apply" at the exact same moment from their laptops. Because state was stored locally without locking, their changes collided, overwriting each other\'s resource IDs and leaving 4 orphaned cloud resources. You must migrate the team to an encrypted remote backend with distributed state locking.',
    problemStatement: 'Local state files cannot be shared safely across a team: they lack state locking (causing race conditions), expose sensitive secrets in plaintext on developer laptops, and prevent collaborative CI/CD automation. An enterprise remote backend with locking is mandatory.',
    projectObjective: [
      'Configure an enterprise remote backend with state locking (AWS S3 + DynamoDB or LocalStack / Terraform Cloud)',
      'Execute a zero-loss state migration from local terraform.tfstate to the remote backend',
      'Demonstrate distributed state locking preventing concurrent execution conflicts',
      'Perform surgical state refactoring using terraform state mv, terraform state rm, and terraform import'
    ],
    whatYouNeedToBuild: {
      description: 'An enterprise remote state architecture managing state snapshots with distributed locking and state surgery capabilities.',
      diagram: `Engineer 1 (terraform apply) ───┐
                                  │ (Acquires Lock)
                                  ▼
                    [DynamoDB Lock Table: tf-state-locks]
                                  ▲ (LOCK ACTIVE: LockID: 4a2b9e...)
                                  │
Engineer 2 (terraform apply) ────┴──> BLOCKED! "Error: Error acquiring the state lock"
                                  │
                                  ▼ (Lock Released upon completion)
                    [S3 Bucket: tf-state-bucket]
                    └── Encrypted Remote State (AES-256 / KMS, Versioning Enabled)`
    },
    requirements: {
      functional: [
        'Local state must be migrated to the remote backend without recreating any existing infrastructure',
        'Concurrent execution of terraform apply must be rejected by the state locking mechanism',
        'Existing unmanaged resources must be successfully imported into the state using terraform import'
      ],
      technical: [
        'Configure backend "s3" with bucket, key, region, and dynamodb_table',
        'Execute terraform init -migrate-state',
        'Use terraform state mv to rename resources without destroying and recreating them'
      ],
      security: [
        'Enforce server-side encryption (SSE-S3 or KMS) on the state bucket',
        'Enable S3 bucket versioning to allow rolling back corrupted state snapshots'
      ]
    },
    architecture: {
      summary: 'Centralized state management architecture decoupling local CLI execution from remote state storage and atomic distributed lock tables.',
      diagram: `Terraform CLI Client ──(Acquire Lock)──> Lock Database (DynamoDB) ──(Read/Write State)──> Encrypted Bucket (S3)`,
      components: [
        { name: 'Remote State Store (S3)', role: 'Encrypted object storage bucket holding versioned state snapshots', technologies: ['AWS S3 / MinIO'] },
        { name: 'Distributed Lock Table', role: 'NoSQL table maintaining atomic lease tokens during plan/apply operations', technologies: ['DynamoDB'] },
        { name: 'State Surgery Engine', role: 'Plumbing CLI commands (mv, rm, import) modifying internal state JSON safely', technologies: ['Terraform CLI'] }
      ]
    },
    technologyRequirements: {
      required: ['Terraform CLI 1.5+', 'AWS account or LocalStack (S3 + DynamoDB)', 'Docker'],
      optional: ['MinIO for self-hosted S3-compatible testing'],
      outOfScope: ['Third-party commercial state backends (Spacelift/Scalr)']
    },
    functionalRequirements: [
      'Initialize and apply basic infrastructure using default local backend',
      'Provision backend infrastructure: S3 bucket with versioning and DynamoDB lock table',
      'Add backend "s3" block to configuration and run terraform init -migrate-state',
      'Verify local terraform.tfstate is empty and remote state is populated',
      'Simulate lock collision: start a long-running apply in terminal 1; attempt apply in terminal 2 and verify lock error',
      'Perform state surgery: rename a resource in HCL and use terraform state mv to align state without destroying',
      'Import an existing unmanaged resource into state using terraform import'
    ],
    technicalRequirements: [
      'Verify bucket versioning records every state change: aws s3api list-object-versions',
      'Demonstrate emergency lock release using terraform force-unlock <LOCK_ID>'
    ],
    securityRequirements: [
      'Verify public access block is enabled on the state S3 bucket (BlockPublicAcls, BlockPublicPolicy)',
      'Confirm TLS 1.2+ is enforced in bucket policy'
    ],
    constraints: [
      'Do not manually edit terraform.tfstate JSON in a text editor (always use state CLI commands)',
      'Never run terraform force-unlock unless you have confirmed the other process has terminated'
    ],
    expectedOutcome: 'A rock-solid remote state infrastructure with zero-loss migration, active state locking, and verified state surgery capabilities.',
    deliverables: [
      'Backend provisioning Terraform code (backend-infra/)',
      'Main configuration with remote backend block',
      'REMOTE_STATE_OPERATIONS_MANUAL.md detailing migration, lock troubleshooting, and state surgery procedures'
    ],
    suggestedProjectStructure: `remote-state-platform/
├── backend-setup/
│   ├── main.tf (Creates S3 + DynamoDB)
│   └── outputs.tf
├── app-infra/
│   ├── backend.tf
│   ├── main.tf
│   └── variables.tf
└── REMOTE_STATE_OPERATIONS_MANUAL.md`,
    requiredConcepts: [
      { name: 'Terraform State Management', lessonId: 'ch-07', academyRoute: '/terraform' },
      { name: 'Remote State & Backends', lessonId: 'ch-10', academyRoute: '/terraform' },
      { name: 'State Locking & Concurrency', lessonId: 'ch-10', academyRoute: '/terraform' },
      { name: 'State Surgery & Import', lessonId: 'ch-14', academyRoute: '/terraform' }
    ],
    resources: {
      academyLessons: [
        { title: 'Chapter 07: Terraform State Core', route: '/cloudstack/terraform?concept=ch-07' },
        { title: 'Chapter 10: Remote Backends & State Locking', route: '/cloudstack/terraform?concept=ch-10' },
        { title: 'Chapter 14: State Surgery (mv, rm, import)', route: '/cloudstack/terraform?concept=ch-14' }
      ],
      officialDocs: [
        { title: 'S3 Backend Configuration', url: 'https://developer.hashicorp.com/terraform/language/settings/backends/s3' },
        { title: 'Command: state mv', url: 'https://developer.hashicorp.com/terraform/cli/commands/state/mv' },
        { title: 'Command: import', url: 'https://developer.hashicorp.com/terraform/cli/commands/import' }
      ],
      referenceMaterial: ['HashiCorp Terraform State Locking Technical Specification'],
      usefulCommands: [
        'terraform init -migrate-state',
        'terraform state list',
        'terraform state mv docker_container.old docker_container.new',
        'terraform state rm docker_container.obsolete',
        'terraform import docker_container.existing <container_id>',
        'terraform force-unlock <lock_id>'
      ]
    },
    recommendedApproach: [
      '1. Create and apply resources with local state to establish the baseline.',
      '2. Provision an S3 bucket with versioning and encryption, plus a DynamoDB table with LockID primary key.',
      '3. Add the backend "s3" configuration block to the application Terraform code.',
      '4. Execute terraform init -migrate-state; confirm migration when prompted.',
      '5. Inspect the S3 bucket to verify the state object is created.',
      '6. Open two terminal windows; initiate apply in Terminal 1 and immediately run plan in Terminal 2.',
      '7. Confirm Terminal 2 is rejected with an active state lock error.',
      '8. Refactor a resource name in main.tf and execute terraform state mv to update state without destruction.',
      '9. Launch an unmanaged container via docker run and bring it into Terraform management via terraform import.',
      '10. Author REMOTE_STATE_OPERATIONS_MANUAL.md.'
    ],
    importantConsiderations: [
      'Why is DynamoDB state locking critical even if the S3 bucket has versioning enabled?',
      'What are the dangers of editing the raw terraform.tfstate JSON file manually?',
      'When is terraform force-unlock justified, and what precautions must be taken before running it?'
    ],
    commonPitfalls: [
      'Creating the backend S3 bucket and DynamoDB table inside the same Terraform configuration that uses them as a backend (chicken-and-egg problem).',
      'Forgetting LockID (String) as the partition key on the DynamoDB table, causing state locking to fail.',
      'Running terraform state rm without realizing it only deletes the state pointer, leaving real cloud resources running and orphaned.'
    ],
    optionalEnhancements: {
      beginner: ['Inspect the S3 bucket versioning history after 3 consecutive apply operations.'],
      intermediate: ['Configure cross-region replication (CRR) on the state S3 bucket for disaster recovery.'],
      advanced: ['Use terraform_remote_state data source to consume outputs from another independent state file.'],
      expert: ['Set up automated state drift detection alerting using AWS EventBridge and SNS.']
    },
    completionChecklist: [
      'Remote state bucket and DynamoDB lock table provisioned',
      'Local state successfully migrated to remote backend via -migrate-state',
      'Concurrent execution test confirms state locking blocks simultaneous apply',
      'terraform state mv renames resource without recreation',
      'terraform import imports existing unmanaged resource cleanly',
      'Bucket encryption and versioning confirmed active',
      'REMOTE_STATE_OPERATIONS_MANUAL.md published'
    ]
  },
  {
    id: 'terraform-07',
    code: 'TERRAFORM-07',
    title: 'Infrastructure Security, Policy-as-Code & Compliance',
    academy: 'terraform',
    difficulty: 'Advanced+',
    estimatedTime: '12-16 hours',
    technologies: ['Policy-as-Code (OPA / Checkov)', 'Tfsec / Trivy', 'Secrets Management (Vault)', 'KMS Encryption', 'CIS Benchmarks'],
    overview: 'Implement enterprise infrastructure security and compliance guardrails in Terraform using Policy-as-Code (Checkov / Open Policy Agent), automated static analysis, encrypted secrets injection via HashiCorp Vault, and CIS cloud compliance benchmarks.',
    tags: ['terraform', 'security', 'policy-as-code', 'checkov', 'vault', 'cis-benchmarks', 'compliance'],
    projectOverview: {
      projectName: 'Infrastructure Security, Policy-as-Code & Compliance',
      academy: 'terraform',
      difficulty: 'Advanced+',
      estimatedEffort: '12-16 hours',
      technologies: ['Checkov', 'Open Policy Agent (OPA)', 'Trivy IaC', 'HashiCorp Vault', 'CIS Benchmarks'],
      shortDescription: 'Enforce enterprise security guardrails on Terraform code using Policy-as-Code (Checkov), secret retrieval from HashiCorp Vault, and automated CIS compliance scanning.'
    },
    scenario: 'Your security auditor discovered that multiple developer pull requests provisioned cloud storage buckets with public read access and security groups with 0.0.0.0/0 on SSH port 22. Your platform team must establish automated Policy-as-Code gates that automatically scan Terraform code and block non-compliant infrastructure from ever being deployed.',
    problemStatement: 'Manual security reviews cannot keep pace with fast cloud deployments. Without automated Policy-as-Code guardrails, insecure configurations (unencrypted storage, public database ports, missing access logs) inevitably slip into production.',
    projectObjective: [
      'Integrate Checkov and Trivy IaC static analysis into the Terraform development workflow',
      'Enforce CIS Cloud Benchmark rules (e.g. S3 buckets must have encryption, versioning, and public access blocks)',
      'Write custom Policy-as-Code rules (Python or Rego) enforcing organizational naming and tagging standards',
      'Eliminate hardcoded credentials by injecting dynamic secrets from HashiCorp Vault or AWS Secrets Manager',
      'Automate policy gating in CI to reject pull requests that violate compliance policies'
    ],
    whatYouNeedToBuild: {
      description: 'An automated security and compliance architecture that evaluates Terraform plans against security policies and injects credentials dynamically.',
      diagram: `Terraform Manifest / Plan
           │
           ▼
[Policy-as-Code Engine (Checkov & OPA)]
├── Check 1: CKV_AWS_18: S3 bucket must have access logging enabled ──> PASS
├── Check 2: CKV_AWS_21: S3 bucket must have versioning enabled ──> PASS
├── Check 3: CKV_AWS_24: Security group port 22 not open to 0.0.0.0/0 ──> PASS
└── Check 4: Custom Rule: Mandatory tags (Owner, Environment, CostCenter) ──> PASS
           │
           ▼ (Compliant!)
[HashiCorp Vault Secret Injection] ──(Dynamic DB Creds)──> terraform apply`
    },
    requirements: {
      functional: [
        'Checkov must scan the Terraform codebase and flag any violations of CIS Security Benchmarks',
        'Configurations with unencrypted storage, public databases, or wildcard ingress must fail the scan',
        'Database credentials must be retrieved dynamically from Vault without being stored in *.tfvars'
      ],
      technical: [
        'Configure Checkov CLI with --framework terraform --check CKV_...',
        'Write custom check in custom_checks/ checking for mandatory tags',
        'Configure vault provider to read secrets via data "vault_generic_secret"'
      ],
      security: [
        'Zero plaintext secrets in Terraform code or version-controlled files',
        'Enforce encryption-at-rest (KMS) and encryption-in-transit (TLS 1.2+) on all resources'
      ]
    },
    architecture: {
      summary: 'Security governance architecture integrating shift-left static analysis, policy-as-code guardrails, and dynamic credential leasing.',
      diagram: `Developer HCL ──> Policy Scanner (Checkov) ──> Secrets Broker (Vault) ──> Compliant Infrastructure`,
      components: [
        { name: 'Policy-as-Code Scanner (Checkov)', role: 'Static analysis engine scanning HCL against 1,000+ cloud security benchmarks', technologies: ['Checkov / Python'] },
        { name: 'Custom Rego/Python Policies', role: 'Proprietary enterprise compliance rules enforcing internal tagging and topology standards', technologies: ['OPA / Rego'] },
        { name: 'HashiCorp Vault', role: 'Centralized secrets engine generating short-lived dynamic cloud and database credentials', technologies: ['Vault'] }
      ]
    },
    technologyRequirements: {
      required: ['Terraform CLI 1.5+', 'Checkov CLI or Trivy', 'Docker for local Vault testing'],
      optional: ['Open Policy Agent (OPA) with Conftest'],
      outOfScope: ['Physical PCI-DSS hardware on-premise inspections']
    },
    functionalRequirements: [
      'Author Terraform code with intentional security anti-patterns (unencrypted bucket, open port 22)',
      'Run checkov -d . and verify that security violations are flagged with specific CKV rule IDs',
      'Remediate each violation: add server-side encryption, enable versioning, restrict CIDR blocks',
      'Re-run checkov -d . and confirm 100% compliance pass',
      'Author custom policy custom_checks/mandatory_tags.py enforcing CostCenter tag',
      'Run Vault container locally; configure vault provider in Terraform to fetch database password dynamically'
    ],
    technicalRequirements: [
      'Export Checkov results in JUnit XML or JSON format for CI integration',
      'Verify Vault dynamic secret retrieval using terraform plan'
    ],
    securityRequirements: [
      'Ensure state file permissions are restricted when secrets are consumed'
    ],
    constraints: [
      'Do not disable security checks using inline #checkov:skip comments without written justification',
      'Never commit Vault tokens or root keys to version control'
    ],
    expectedOutcome: 'A certified, compliant Terraform infrastructure codebase verified against CIS benchmarks with automated policy gating and dynamic secrets management.',
    deliverables: [
      'Hardened, compliant Terraform configuration files',
      'Custom Policy-as-Code rule files',
      'Local Vault configuration script',
      'SECURITY_COMPLIANCE_AUDIT_REPORT.md detailing initial vulnerability findings, remediation steps, and final scan clean bill of health'
    ],
    suggestedProjectStructure: `secure-terraform/
├── main.tf
├── variables.tf
├── outputs.tf
├── custom_checks/
│   └── check_mandatory_tags.py
├── scripts/
│   ├── run_security_scan.sh
│   └── setup_local_vault.sh
└── SECURITY_COMPLIANCE_AUDIT_REPORT.md`,
    requiredConcepts: [
      { name: 'Terraform Security & Secrets', lessonId: 'ch-15', academyRoute: '/terraform' },
      { name: 'Infrastructure as Code Security', lessonId: 'ch-01', academyRoute: '/terraform' },
      { name: 'Terraform Best Practices', lessonId: 'ch-13', academyRoute: '/terraform' }
    ],
    resources: {
      academyLessons: [
        { title: 'Chapter 15: Terraform Security & Secrets', route: '/cloudstack/terraform?concept=ch-15' },
        { title: 'Chapter 13: Best Practices & Code Smells', route: '/cloudstack/terraform?concept=ch-13' }
      ],
      officialDocs: [
        { title: 'Checkov Documentation', url: 'https://www.checkov.io/1.Welcome/Quick%20Start.html' },
        { title: 'Vault Provider for Terraform', url: 'https://registry.terraform.io/providers/hashicorp/vault/latest/docs' }
      ],
      referenceMaterial: ['CIS Amazon Web Services Foundations Benchmark v1.4.0'],
      usefulCommands: [
        'checkov -d .',
        'checkov -f main.tf --framework terraform',
        'trivy config .',
        'vault kv get -format=json secret/database'
      ]
    },
    recommendedApproach: [
      '1. Review CIS benchmark requirements for compute, storage, and networking resources.',
      '2. Install Checkov CLI (pip install checkov).',
      '3. Intentionally author vulnerable infrastructure in main.tf to establish baseline test.',
      '4. Execute checkov -d . and document the failing checks.',
      '5. Systematically remediate each finding: attach encryption, block public access, restrict security groups.',
      '6. Re-run Checkov and verify zero failed checks.',
      '7. Author a custom Python/YAML policy enforcing company-specific CostCenter and Owner tags.',
      '8. Launch a local HashiCorp Vault instance and populate test database credentials.',
      '9. Configure the Vault provider in Terraform to inject the credential dynamically at plan/apply time.',
      '10. Compile findings into SECURITY_COMPLIANCE_AUDIT_REPORT.md.'
    ],
    importantConsiderations: [
      'Why is scanning Terraform code (shift-left) more cost-effective than remediating vulnerabilities after cloud deployment?',
      'How does dynamic secret leasing in Vault prevent credential theft compared to long-lived static passwords?',
      'When is it appropriate to suppress a Checkov security check using an inline skip comment?'
    ],
    commonPitfalls: [
      'Committing Vault root tokens or secret IDs into provider configuration blocks in main.tf.',
      'Relying solely on runtime cloud security scanners rather than pre-deployment Policy-as-Code in CI.',
      'Skipping security checks indiscriminately without recording an architectural justification.'
    ],
    optionalEnhancements: {
      beginner: ['Generate an HTML security report from Checkov scan results.'],
      intermediate: ['Integrate Checkov as a pre-commit hook on developer workstations.'],
      advanced: ['Implement Open Policy Agent (OPA) Rego rules using Conftest.'],
      expert: ['Set up automatic KMS key rotation policies managed by Terraform.']
    },
    completionChecklist: [
      'Initial Terraform code scanned and security anti-patterns identified',
      'All CIS benchmark findings remediated with encryption and access controls',
      'Checkov scan passes with 0 failures on all managed resources',
      'Custom Policy-as-Code rule implemented and verified',
      'HashiCorp Vault provider configured retrieving dynamic credentials',
      'Zero plaintext secrets in source files or git history',
      'SECURITY_COMPLIANCE_AUDIT_REPORT.md published'
    ]
  },
  {
    id: 'terraform-08',
    code: 'TERRAFORM-08',
    title: 'Production Cloud Architecture (Multi-Tier VPC, Compute & DB)',
    academy: 'terraform',
    difficulty: 'Expert',
    estimatedTime: '14-18 hours',
    technologies: ['Multi-Tier VPC', 'Public & Private Subnets', 'NAT Gateway', 'Application Load Balancer (ALB)', 'Auto Scaling Group (ASG)', 'RDS Database'],
    overview: 'Architect and provision an enterprise high-availability, multi-AZ cloud production environment using Terraform, featuring a multi-tier VPC (public, private, database subnets), NAT gateways, ALB, auto-scaling compute, and managed database.',
    tags: ['terraform', 'production', 'vpc', 'multi-tier', 'high-availability', 'aws', 'alb', 'asg', 'rds'],
    projectOverview: {
      projectName: 'Production Cloud Architecture (Multi-Tier VPC, Compute & DB)',
      academy: 'terraform',
      difficulty: 'Expert',
      estimatedEffort: '14-18 hours',
      technologies: ['AWS / LocalStack', 'Multi-Tier VPC', 'Application Load Balancer', 'Auto Scaling Group', 'RDS Database'],
      shortDescription: 'Engineer a multi-tier, high-availability cloud architecture across multiple Availability Zones featuring VPC segmentation, ALB load balancing, and private database storage.'
    },
    scenario: 'Your SaaS company is migrating from single-server hosting to a mission-critical multi-AZ production architecture in AWS. Leadership requires a resilient architecture that can survive an entire data center availability zone outage: public web tier fronted by an Application Load Balancer, private application compute tier with auto-scaling, and a private multi-AZ database tier.',
    problemStatement: 'Single-node architectures lack fault tolerance, scalability, and security isolation. A professional cloud architecture requires network segmentation across public subnets (ALB/NAT), private application subnets (stateless compute), and isolated database subnets (stateful storage) spanned across at least 2 Availability Zones.',
    projectObjective: [
      'Design and deploy a Multi-Tier VPC spanning 2 Availability Zones (Public, Private, Database subnets)',
      'Provision Internet Gateway (IGW) and redundant NAT Gateways for outbound internet from private subnets',
      'Deploy an Application Load Balancer (ALB) with health checks in the public subnets',
      'Deploy an Auto Scaling Group (ASG) of compute instances in the private application subnets',
      'Deploy a Multi-AZ managed database instance in the isolated database subnet group'
    ],
    whatYouNeedToBuild: {
      description: 'A complete multi-tier, multi-AZ production cloud architecture completely defined and provisioned via Terraform.',
      diagram: `[Virtual Private Cloud: 10.0.0.0/16]
├── Public Subnets (AZ-a & AZ-b)
│   ├── Internet Gateway (IGW)
│   ├── Application Load Balancer (ALB: Port 80/443)
│   └── NAT Gateways (AZ-a & AZ-b)
│
├── Private Application Subnets (AZ-a & AZ-b)
│   ├── Route to NAT Gateways (Outbound only)
│   └── Auto Scaling Group (EC2 / ECS Tasks: Min 2, Max 6)
│       └── Security Group: Ingress ONLY from ALB
│
└── Private Database Subnets (AZ-a & AZ-b)
    └── Multi-AZ RDS Database (Primary in AZ-a, Standby in AZ-b)
        └── Security Group: Ingress ONLY from App Subnets (Port 5432)`
    },
    requirements: {
      functional: [
        'Application must be accessible via the public Application Load Balancer DNS endpoint',
        'Compute instances must reside in private subnets with no public IP addresses assigned',
        'Database must reside in dedicated private database subnets and accept connections exclusively from application instances',
        'Simulating an instance failure must trigger the Auto Scaling Group to replace the instance automatically'
      ],
      technical: [
        'Use aws provider (or localstack simulated provider)',
        'Structure modules: vpc_module, compute_module, database_module',
        'Use cidrsubnet() function to compute subnet CIDR blocks dynamically'
      ],
      security: [
        'Strict security group chaining: ALB -> App SG -> DB SG',
        'Zero direct internet ingress to compute or database instances'
      ]
    },
    architecture: {
      summary: 'Three-tier multi-AZ enterprise cloud architecture establishing Defense-in-Depth network boundaries, redundant egress gateways, and managed database replication.',
      diagram: `Internet ──> IGW ──> ALB (Public) ──> Private App ASG (Private) ──> Multi-AZ RDS (Isolated)`,
      components: [
        { name: 'VPC Network Fabric', role: 'Isolated software-defined cloud network spanning multiple AZs', technologies: ['AWS VPC'] },
        { name: 'Application Load Balancer', role: 'Layer 7 load balancer distributing incoming traffic across compute instances', technologies: ['AWS ALB'] },
        { name: 'Auto Scaling Compute Tier', role: 'Elastic pool of stateless application servers automatically scaling on demand', technologies: ['AWS ASG', 'Launch Template'] },
        { name: 'Multi-AZ Database Cluster', role: 'High-availability relational database with automated synchronous standby failover', technologies: ['AWS RDS'] }
      ]
    },
    technologyRequirements: {
      required: ['Terraform CLI 1.5+', 'AWS account (Free Tier) or LocalStack Pro/Community'],
      optional: ['AWS CLI for verifying resource state'],
      outOfScope: ['Global Multi-Region Route53 latency routing']
    },
    functionalRequirements: [
      'Author Terraform modules for VPC, Compute (ALB+ASG), and Database',
      'Compute dynamic subnet CIDRs using cidrsubnet(var.vpc_cidr, 4, index)',
      'Provision Internet Gateway and route table for public subnets',
      'Provision NAT Gateway and route tables for private subnets',
      'Deploy ALB with target group and HTTP health checks (/healthz)',
      'Deploy Launch Template and Auto Scaling Group with min_size=2 and max_size=4',
      'Deploy RDS PostgreSQL instance in private database subnet group',
      'Run terraform apply and verify end-to-end traffic flow through ALB to backend'
    ],
    technicalRequirements: [
      'Validate security group chaining: verify DB security group only allows ingress from App security group ID',
      'Verify terraform plan shows zero unexpected diffs after initial apply'
    ],
    securityRequirements: [
      'Enable storage encryption on RDS using KMS',
      'Ensure all EC2 EBS root volumes have encryption enabled'
    ],
    constraints: [
      'Do not assign public IP addresses to compute instances in private subnets',
      'Do not place database instances in public subnets'
    ],
    expectedOutcome: 'A complete, enterprise-grade multi-tier production cloud architecture provisioned declaratively with zero manual console intervention.',
    deliverables: [
      'VPC module (modules/vpc/)',
      'Compute module (modules/compute/)',
      'Database module (modules/database/)',
      'Root orchestration configuration (main.tf, outputs.tf)',
      'PRODUCTION_ARCHITECTURE_MANUAL.md detailing network topology, security group matrix, and failover design'
    ],
    suggestedProjectStructure: `production-cloud/
├── main.tf
├── variables.tf
├── outputs.tf
├── modules/
│   ├── vpc/
│   │   ├── main.tf
│   │   ├── variables.tf
│   │   └── outputs.tf
│   ├── compute/
│   │   ├── main.tf
│   │   ├── variables.tf
│   │   └── outputs.tf
│   └── database/
│       ├── main.tf
│       ├── variables.tf
│       └── outputs.tf
└── PRODUCTION_ARCHITECTURE_MANUAL.md`,
    requiredConcepts: [
      { name: 'Production Cloud Architectures', lessonId: 'ch-16', academyRoute: '/terraform' },
      { name: 'Terraform Modules & Composition', lessonId: 'ch-08', academyRoute: '/terraform' },
      { name: 'HCL Functions (cidrsubnet)', lessonId: 'ch-06', academyRoute: '/terraform' },
      { name: 'Terraform Security & IAM', lessonId: 'ch-15', academyRoute: '/terraform' }
    ],
    resources: {
      academyLessons: [
        { title: 'Chapter 16: Production Cloud Architectures', route: '/cloudstack/terraform?concept=ch-16' },
        { title: 'Chapter 08: Modules & Architecture', route: '/cloudstack/terraform?concept=ch-08' },
        { title: 'Chapter 06: Built-in Functions', route: '/cloudstack/terraform?concept=ch-06' }
      ],
      officialDocs: [
        { title: 'AWS Well-Architected Framework - Reliability Pillar', url: 'https://docs.aws.amazon.com/wellarchitected/latest/reliability-pillar/welcome.html' },
        { title: 'Terraform AWS Provider Documentation', url: 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs' }
      ],
      referenceMaterial: ['AWS Certified Solutions Architect Professional Design Guide'],
      usefulCommands: [
        'terraform plan -out=prodplan',
        'terraform apply prodplan',
        'curl http://<ALB_DNS_NAME>',
        'aws ec2 describe-instances --filters "Name=vpc-id,Values=<VPC_ID>"'
      ]
    },
    recommendedApproach: [
      '1. Design VPC CIDR block (10.0.0.0/16) and plan subnet allocation across 2 AZs.',
      '2. Author modules/vpc provisioning VPC, public subnets, private subnets, database subnets, IGW, and NAT.',
      '3. Author modules/database provisioning private DB subnet group and Multi-AZ RDS instance.',
      '4. Author modules/compute provisioning security groups, ALB, Launch Template, and ASG.',
      '5. Wire modules together in root main.tf, passing subnet IDs and security group references.',
      '6. Run terraform validate and execute speculative terraform plan.',
      '7. Execute terraform apply to provision the entire cloud topology.',
      '8. Test HTTP connectivity against the ALB public DNS name.',
      '9. Test resilience: terminate one EC2 instance via CLI; observe ASG automatically launching a replacement.',
      '10. Author PRODUCTION_ARCHITECTURE_MANUAL.md.'
    ],
    importantConsiderations: [
      'Why is distributing public, private, and database subnets across at least 2 Availability Zones mandatory for 99.99% availability?',
      'How does security group chaining (referencing another security group as source) eliminate the need to hardcode IP addresses?',
      'What are the cost implications of running redundant NAT Gateways across multiple AZs vs a single NAT Gateway?'
    ],
    commonPitfalls: [
      'Placing NAT Gateways in private subnets instead of public subnets, breaking outbound internet for compute instances.',
      'Forgetting to attach the Internet Gateway route to the public subnet route table.',
      'Assigning public IP addresses to private compute instances, exposing them directly to internet scanners.'
    ],
    optionalEnhancements: {
      beginner: ['Add automated HTTPS redirect on the Application Load Balancer.'],
      intermediate: ['Configure CloudWatch CPU utilization alarms triggering ASG scaling policies.'],
      advanced: ['Implement AWS VPC Flow Logs streaming to CloudWatch Logs for security auditing.'],
      expert: ['Add AWS WAF (Web Application Firewall) attached to the ALB blocking SQLi and XSS attacks.']
    },
    completionChecklist: [
      'Multi-Tier VPC provisioned spanning 2 Availability Zones',
      'Public, Private, and Database subnets calculated dynamically using cidrsubnet()',
      'Internet Gateway and NAT Gateways provisioned and routing correctly',
      'Security group chaining configured without hardcoded IP ranges',
      'Application Load Balancer deployed with healthy target group',
      'Auto Scaling Group launches minimum 2 instances in private subnets',
      'Traffic verified flowing from ALB to private compute instances',
      'PRODUCTION_ARCHITECTURE_MANUAL.md published'
    ]
  },
  {
    id: 'terraform-09',
    code: 'TERRAFORM-09',
    title: 'Automated Infrastructure CI/CD Pipeline with Drift Detection',
    academy: 'terraform',
    difficulty: 'Expert / Production',
    estimatedTime: '16-20 hours',
    technologies: ['GitHub Actions / GitLab CI', 'OIDC Cloud Authentication', 'Automated PR Planning', 'Drift Detection Cron', 'Slack / Webhook Alerts'],
    overview: 'Design, implement, and operate an enterprise automated Infrastructure as Code (IaC) continuous delivery pipeline, featuring keyless OIDC cloud authentication, automated pull-request speculative planning, gated production apply, and scheduled out-of-band drift detection.',
    tags: ['terraform', 'ci-cd', 'drift-detection', 'oidc', 'github-actions', 'automation', 'sre'],
    projectOverview: {
      projectName: 'Automated Infrastructure CI/CD Pipeline with Drift Detection',
      academy: 'terraform',
      difficulty: 'Expert / Production',
      estimatedEffort: '16-20 hours',
      technologies: ['Terraform CLI', 'GitHub Actions', 'AWS OIDC', 'Scheduled Drift Detection', 'Slack Notifications'],
      shortDescription: 'Build an enterprise Infrastructure as Code CI/CD pipeline featuring keyless OIDC authentication, automated PR plan comments, gated apply, and daily scheduled drift detection.'
    },
    scenario: 'Your organization suffered an outage when an administrator manually altered a firewall rule in the cloud console to debug an issue and forgot to revert it. When Terraform was next applied, the manual change was overwritten, breaking production. You must build an automated pipeline that continuously monitors for out-of-band infrastructure drift and alerts the on-call team.',
    problemStatement: 'Infrastructure changes made outside of version control (ClickOps or manual script execution) cause configuration drift that causes unexpected breaking changes during routine Terraform deployments. An automated pipeline is required to detect and alert on drift continuously.',
    projectObjective: [
      'Configure keyless OIDC authentication between GitHub Actions and the cloud provider (eliminating static cloud keys)',
      'Automate speculative terraform plan execution on pull requests with formatted markdown comments',
      'Implement an automated production apply workflow gated by human peer review',
      'Create a scheduled cron workflow (.github/workflows/drift-detection.yml) running terraform plan -detailed-exitcode',
      'Send automated Slack/webhook alerts whenever out-of-band configuration drift is detected'
    ],
    whatYouNeedToBuild: {
      description: 'An enterprise Infrastructure CI/CD pipeline managing pull request reviews, automated deployments, and continuous drift monitoring.',
      diagram: `Branch PR Created ──> [CI Plan Workflow] ──(OIDC Auth)──> terraform plan ──> Post Diff on PR
                                                                                              │
                                                                                              ▼ (Merged to main)
                                                [CD Apply Workflow] ──(OIDC Auth)──> terraform apply -auto-approve
                                                                                              │
Nightly Cron Trigger (0 0 * * *)                                                              │
         │                                                                                    ▼
         ▼                                                                          [Live Cloud Infrastructure]
[Scheduled Drift Detection Workflow]                                                          │
├── 1. terraform plan -detailed-exitcode                                                      │
├── Exit Code 0: In Sync (No Action)                                                          │
└── Exit Code 2: DRIFT DETECTED! ─────────────────────────────────────────────────────────────┘
    └── Dispatch Webhook Alert: "Drift detected on AWS VPC! Check manual console changes."`
    },
    requirements: {
      functional: [
        'PRs must automatically receive an updated comment containing the exact terraform plan output',
        'Applying to production must only execute on the main branch after PR approval',
        'Scheduled drift detection must run every night and fire an alert if someone made manual changes in the cloud console'
      ],
      technical: [
        'Authenticate using aws-actions/configure-aws-credentials with OIDC role-to-assume',
        'Detect drift using terraform plan -detailed-exitcode (exit code 2 indicates changes present)',
        'Configure workflow with permissions: id-token: write, contents: read'
      ],
      security: [
        'Zero static AWS Access Keys or Secret Keys stored in GitHub Secrets (100% OIDC-based)',
        'Lock down OIDC trust policy to specific repository and branch'
      ]
    },
    architecture: {
      summary: 'Continuous infrastructure governance architecture combining pull request speculative verification, authoritative state deployment, and continuous out-of-band drift reconciliation.',
      diagram: `Git Pull Request ──> OIDC Token Exchange ──> Speculative Plan ──> Main Apply ──> Scheduled Drift Watchdog`,
      components: [
        { name: 'OIDC Identity Provider', role: 'Federated identity trust establishing short-lived STS credentials for GitHub runners', technologies: ['OpenID Connect', 'AWS STS'] },
        { name: 'PR Automation Engine', role: 'Speculative planner generating plan diffs and posting review comments', technologies: ['GitHub Actions', 'HCL'] },
        { name: 'Drift Detection Watchdog', role: 'Scheduled cron runner executing plan without applying to identify out-of-band mutations', technologies: ['detailed-exitcode'] },
        { name: 'Alert Dispatcher', role: 'Notification gateway alerting SRE on-call engineers of configuration entropy', technologies: ['Slack / Webhook'] }
      ]
    },
    technologyRequirements: {
      required: ['Terraform CLI 1.5+', 'GitHub repository with Actions', 'AWS or Cloud Provider with OIDC role'],
      optional: ['LocalStack with simulated OIDC alternative'],
      outOfScope: ['Third-party enterprise SaaS runners']
    },
    functionalRequirements: [
      'Configure AWS IAM OIDC identity provider and role with trust policy for the GitHub repository',
      'Create .github/workflows/tf-pr.yml generating speculative plans on pull requests',
      'Create .github/workflows/tf-apply.yml applying changes on merge to main',
      'Create .github/workflows/drift-detection.yml running on schedule (cron: "0 2 * * *")',
      'Simulate drift: manually change a tag or security group description in cloud console',
      'Trigger drift workflow manually and verify that exit code 2 is caught and alert payload is sent'
    ],
    technicalRequirements: [
      'Verify OIDC authentication in runner logs shows temporary STS assumed role',
      'Verify detailed-exitcode interpretation in bash script'
    ],
    securityRequirements: [
      'Ensure OIDC trust policy specifies stringEquals for repo:org/repo:ref:refs/heads/main'
    ],
    constraints: [
      'Never store long-lived AWS secret access keys in GitHub Secrets',
      'Do not auto-apply detected drift without human inspection (alert only)'
    ],
    expectedOutcome: 'A certified, automated enterprise Infrastructure as Code CI/CD pipeline providing keyless authentication, PR plan transparency, and continuous drift detection.',
    deliverables: [
      'Pull request plan workflow (.github/workflows/tf-pr.yml)',
      'Production apply workflow (.github/workflows/tf-apply.yml)',
      'Scheduled drift detection workflow (.github/workflows/drift-detection.yml)',
      'OIDC trust policy specification (oidc-trust-policy.json)',
      'DRIFT_DETECTION_RUNBOOK.md detailing drift triage, state reconciliation, and alert procedures'
    ],
    suggestedProjectStructure: `.github/
└── workflows/
    ├── tf-pr.yml
    ├── tf-apply.yml
    └── drift-detection.yml
terraform/
├── backend.tf
├── main.tf
├── variables.tf
└── outputs.tf
scripts/
└── notify-drift.sh
DRIFT_DETECTION_RUNBOOK.md`,
    requiredConcepts: [
      { name: 'Infrastructure as Code Automation', lessonId: 'ch-01', academyRoute: '/terraform' },
      { name: 'Remote State & Concurrency', lessonId: 'ch-10', academyRoute: '/terraform' },
      { name: 'State Management & Drift', lessonId: 'ch-07', academyRoute: '/terraform' },
      { name: 'Terraform Security & IAM', lessonId: 'ch-15', academyRoute: '/terraform' }
    ],
    resources: {
      academyLessons: [
        { title: 'Chapter 01: IaC & Automation', route: '/cloudstack/terraform?concept=ch-01' },
        { title: 'Chapter 10: Remote State & Locking', route: '/cloudstack/terraform?concept=ch-10' },
        { title: 'Chapter 07: Terraform State & Drift', route: '/cloudstack/terraform?concept=ch-07' }
      ],
      officialDocs: [
        { title: 'Configuring OpenID Connect in Amazon Web Services', url: 'https://docs.github.com/en/actions/deployment/security-hardening-your-deployments/configuring-openid-connect-in-amazon-web-services' },
        { title: 'Terraform CLI: -detailed-exitcode', url: 'https://developer.hashicorp.com/terraform/cli/commands/plan#detailed-exitcode' }
      ],
      referenceMaterial: ['Google SRE: Managing Configuration Entropy and Drift'],
      usefulCommands: [
        'terraform plan -detailed-exitcode',
        'gh workflow run drift-detection.yml',
        'aws sts get-caller-identity'
      ]
    },
    recommendedApproach: [
      '1. Configure AWS IAM OIDC identity provider for GitHub Actions.',
      '2. Create an IAM role with permissions to manage target infrastructure and trust policy for GitHub OIDC.',
      '3. Author .github/workflows/tf-pr.yml with OIDC authentication and terraform plan.',
      '4. Add PR comment step posting formatted plan output to the PR.',
      '5. Author .github/workflows/tf-apply.yml with main push trigger and terraform apply.',
      '6. Author .github/workflows/drift-detection.yml running on cron schedule.',
      '7. Use terraform plan -detailed-exitcode in the drift workflow, evaluating exit codes (0 = clean, 2 = drift).',
      '8. Add notification step dispatching webhook on exit code 2.',
      '9. Simulate manual cloud drift, run the drift workflow, and verify alert triggers.',
      '10. Publish DRIFT_DETECTION_RUNBOOK.md.'
    ],
    importantConsiderations: [
      'How does keyless OIDC authentication eliminate the threat of leaked static credentials from CI runners?',
      'What is the meaning of each exit code in terraform plan -detailed-exitcode (0 = no changes, 1 = error, 2 = changes present)?',
      'Why should automated drift detection alert operators rather than blindly running terraform apply automatically?'
    ],
    commonPitfalls: [
      'Failing to grant id-token: write permissions in the GitHub Actions workflow, causing OIDC token retrieval to fail.',
      'Allowing drift detection scripts to fail the CI job when drift is detected (exit code 2 should be handled gracefully, not crash the job).',
      'Wildcard OIDC trust policies that allow any repository in your organization to assume production infrastructure roles.'
    ],
    optionalEnhancements: {
      beginner: ['Add automated cost projection (Infracost) to the PR comment.'],
      intermediate: ['Integrate Slack interactive buttons allowing on-call engineers to trigger remediation from chat.'],
      advanced: ['Implement automated speculative plan destruction checks for PRs deleting resources.'],
      expert: ['Build an automated self-healing pipeline that opens a GitHub PR to reconcile detected drift into code.']
    },
    completionChecklist: [
      'AWS IAM OIDC identity provider configured and bound to GitHub Actions',
      'Pull request workflow created, authenticating via OIDC and posting plan comments',
      'Production apply workflow configured running strictly on main merge',
      'Scheduled drift detection workflow authored using -detailed-exitcode',
      'Simulated console change triggers drift alert successfully',
      'Zero static credentials stored in GitHub Secrets',
      'DRIFT_DETECTION_RUNBOOK.md published'
    ]
  },
  {
    id: 'terraform-10',
    code: 'TERRAFORM-10',
    title: 'Enterprise Infrastructure Platform & Disaster Recovery',
    academy: 'terraform',
    difficulty: 'Production Grade',
    estimatedTime: '16-24 hours',
    technologies: ['Enterprise Terraform Architecture', 'Multi-Region Replication', 'Terragrunt / Module Orchestration', 'Disaster Recovery RTO/RPO', 'State Reconstruction'],
    overview: 'The pinnacle Terraform engineering project: architect, govern, provision, and operate an enterprise multi-region cloud infrastructure platform featuring disaster recovery failover, automated cross-region replication, blast radius containment, and simulated catastrophic region loss recovery.',
    tags: ['terraform', 'production-grade', 'enterprise', 'multi-region', 'disaster-recovery', 'rto-rpo', 'failover'],
    projectOverview: {
      projectName: 'Enterprise Infrastructure Platform & Disaster Recovery',
      academy: 'terraform',
      difficulty: 'Production Grade',
      estimatedEffort: '16-24 hours',
      technologies: ['Enterprise Terraform', 'Multi-Region Architecture', 'Cross-Region Replication', 'Disaster Recovery Runbook'],
      shortDescription: 'The master Terraform capstone: engineer an enterprise multi-region cloud platform capable of complete automated disaster recovery across primary and secondary regions.'
    },
    scenario: 'You are the Chief Infrastructure Architect for an international payment network. Regulatory standards require that your infrastructure survive a catastrophic regional blackout (e.g. AWS us-east-1 complete failure) with a Recovery Time Objective (RTO) under 15 minutes and Recovery Point Objective (RPO) under 1 minute. You must architect, provision, and validate the complete multi-region disaster recovery platform using Terraform.',
    problemStatement: 'Single-region cloud platforms represent a single point of failure during major cloud provider outages. Enterprise business continuity requires active-passive or active-active multi-region infrastructure, automated cross-region database replication, global DNS health check failover, and audited disaster recovery reconstruction procedures.',
    projectObjective: [
      'Architect an enterprise multi-region platform across Primary (e.g. us-east-1) and Secondary (e.g. us-west-2) regions',
      'Provision multi-tier VPCs, compute pools, and cross-region replicated storage using modular Terraform',
      'Implement global DNS failover routing with health probes (Route 53 or Cloudflare)',
      'Establish cross-region database read replica synchronization with automated promotion capability',
      'Execute a live simulated catastrophic region disaster drill: fail over all traffic to secondary region in < 15 minutes'
    ],
    whatYouNeedToBuild: {
      description: 'An enterprise multi-region cloud architecture featuring automated cross-region data replication, health-probed global traffic failover, and disaster recovery automation.',
      diagram: `                       Global Users (api.company.com)
                                     │
                                     ▼
                [Global DNS Failover Routing (Route 53)]
                ├── Primary Endpoint Health Check (Passing)
                └── Automated Failover to Secondary on 3 Consecutive Failures
                                     │
            ┌────────────────────────┴────────────────────────┐
            ▼ (Normal Operations: 100% Traffic)               ▼ (Standby: 0% Traffic / Passive)
[PRIMARY REGION (us-east-1)]                       [SECONDARY REGION (us-west-2)]
├── Multi-Tier VPC (10.1.0.0/16)                   ├── Multi-Tier VPC (10.2.0.0/16)
├── Application Load Balancer & ASG                ├── Application Load Balancer & ASG
└── Primary Database (Read/Write)                  └── Cross-Region Read Replica (Sync)
            │                                                 ▲
            └──────────(Async Cross-Region Replication)───────┘
                                     │
      [SIMULATED DISASTER DRILL: PRIMARY REGION BLACKOUT]
      ├── 1. Route 53 marks Primary Unhealthy (30s)
      ├── 2. DNS routes 100% traffic to Secondary ALB
      ├── 3. Terraform promotes Read Replica to Standalone Primary
      └── 4. Total Platform Recovery Achieved in < 15 Minutes!`
    },
    requirements: {
      functional: [
        'Terraform must provision identical, reproducible infrastructure across both Primary and Secondary regions',
        'Database replication must synchronize data from Primary to Secondary continuously',
        'During simulated disaster, promoting Secondary region to active primary must execute in < 15 minutes without data loss'
      ],
      technical: [
        'Configure dual aws provider aliases (aws.primary and aws.secondary)',
        'Structure modules for multi-region consumption',
        'Automate failover promotion steps using Terraform variables or CLI scripts'
      ],
      security: [
        'Enforce multi-region KMS key replication for encrypted data volumes',
        'Ensure IAM permissions enforce separation between primary operations and disaster recovery failover'
      ]
    },
    architecture: {
      summary: 'Enterprise multi-region disaster recovery architecture establishing active-passive hot standby topology, automated cross-region state replication, and global DNS failover.',
      diagram: `Global Route 53 ──> [Primary Region VPC (Active)] ──(Cross-Region Replication)──> [Secondary Region VPC (Hot Standby)]`,
      components: [
        { name: 'Global Traffic Controller', role: 'Latency and health-check driven DNS router switching traffic during regional outages', technologies: ['Route 53 / Anycast'] },
        { name: 'Primary Region VPC Tier', role: 'Active production workload processing customer transactions', technologies: ['AWS us-east-1', 'Terraform'] },
        { name: 'Secondary Region Hot Standby', role: 'Warm standby infrastructure ready to assume full production workload immediately', technologies: ['AWS us-west-2', 'Terraform'] },
        { name: 'Disaster Recovery Automation Suite', role: 'Runbooks and orchestration scripts managing database replica promotion and failover', technologies: ['Terraform CLI', 'Bash'] }
      ]
    },
    technologyRequirements: {
      required: ['Terraform CLI 1.5+', 'AWS account (Multi-region capable) or LocalStack Multi-Region simulation'],
      optional: ['Terragrunt for multi-region DRY orchestration'],
      outOfScope: ['Legacy on-premises mainframe replication']
    },
    functionalRequirements: [
      'Configure providers for primary region (us-east-1) and secondary region (us-west-2)',
      'Provision VPC, subnets, and routing in both regions using reusable VPC module',
      'Deploy Primary database in us-east-1 with cross-region read replica in us-west-2',
      'Deploy Application Load Balancer and compute pools in both regions',
      'Configure Route 53 failover routing policy pointing primary to us-east-1 and secondary to us-west-2',
      'Simulate regional blackout: disable primary health check; observe DNS routing switch to secondary',
      'Promote read replica in us-west-2 to standalone primary and verify writes'
    ],
    technicalRequirements: [
      'Document end-to-end RTO (Recovery Time Objective) and RPO (Recovery Point Objective)',
      'Verify terraform state reflects promoted database without state corruption'
    ],
    securityRequirements: [
      'Ensure cross-region traffic flows over encrypted AWS backbone networks (VPC Peering with encryption)',
      'Ensure compliance audit logs record all failover execution events'
    ],
    constraints: [
      'Do not hardcode single region strings in reusable modules',
      'Disaster recovery failover must be executable by on-call engineers using documented commands'
    ],
    expectedOutcome: 'A certified, multi-region enterprise cloud infrastructure platform capable of surviving complete regional cloud outages with verified sub-15-minute disaster recovery.',
    deliverables: [
      'Multi-region Terraform orchestration codebase',
      'Reusable multi-region infrastructure modules (vpc, compute, database)',
      'DISASTER_RECOVERY_RUNBOOK.md detailing step-by-step failover execution, replica promotion, and failback',
      'DISASTER_RECOVERY_DRILL_REPORT.md recording the live simulated failover drill, RTO/RPO timings, and post-mortem'
    ],
    suggestedProjectStructure: `enterprise-multi-region/
├── main.tf
├── providers.tf
├── variables.tf
├── outputs.tf
├── modules/
│   ├── regional-vpc/
│   ├── compute-tier/
│   └── replicated-database/
├── scripts/
│   ├── simulate_regional_failure.sh
│   └── execute_dr_promotion.sh
├── DISASTER_RECOVERY_RUNBOOK.md
└── DISASTER_RECOVERY_DRILL_REPORT.md`,
    requiredConcepts: [
      { name: 'Production Cloud Architectures', lessonId: 'ch-16', academyRoute: '/terraform' },
      { name: 'Terraform Modules & Composition', lessonId: 'ch-08', academyRoute: '/terraform' },
      { name: 'Remote State & Disaster Recovery', lessonId: 'ch-10', academyRoute: '/terraform' },
      { name: 'Terraform Security & Governance', lessonId: 'ch-15', academyRoute: '/terraform' },
      { name: 'Enterprise Best Practices', lessonId: 'ch-17', academyRoute: '/terraform' }
    ],
    resources: {
      academyLessons: [
        { title: 'Chapter 16: Production Cloud Architectures', route: '/cloudstack/terraform?concept=ch-16' },
        { title: 'Chapter 10: Remote Backends & State Recovery', route: '/cloudstack/terraform?concept=ch-10' },
        { title: 'Chapter 17: Enterprise Terraform Operations', route: '/cloudstack/terraform?concept=ch-17' }
      ],
      officialDocs: [
        { title: 'AWS Multi-Region Application Architecture', url: 'https://aws.amazon.com/solutions/multi-region-application-architecture/' },
        { title: 'Terraform Multi-Provider Configuration', url: 'https://developer.hashicorp.com/terraform/language/providers/configuration#alias-multiple-provider-configurations' }
      ],
      referenceMaterial: ['Disaster Recovery of Workloads on AWS: Recovery in the Cloud'],
      usefulCommands: [
        'terraform plan -var="dr_failover_active=false"',
        'terraform apply -var="dr_failover_active=true"',
        'aws route53 test-dns-answer --hosted-zone-id <ID> --record-name api.company.com --record-type A'
      ]
    },
    recommendedApproach: [
      '1. Define enterprise RTO (< 15 min) and RPO (< 1 min) SLA requirements.',
      '2. Configure multi-provider aliases in providers.tf for primary and secondary regions.',
      '3. Provision identical regional VPCs in both regions using modular Terraform.',
      '4. Deploy Primary database in us-east-1 and cross-region read replica in us-west-2.',
      '5. Provision Application Load Balancers and compute pools in both regions.',
      '6. Configure Route 53 health-checked failover routing policy.',
      '7. Execute baseline apply and verify normal operations in primary region.',
      '8. Conduct live disaster recovery drill: simulate primary region loss.',
      '9. Promote the secondary database replica and verify traffic cutover.',
      '10. Document recovery timings in DISASTER_RECOVERY_RUNBOOK.md and DISASTER_RECOVERY_DRILL_REPORT.md.'
    ],
    importantConsiderations: [
      'What are the replication lag implications of asynchronous cross-region database replication on RPO?',
      'Why is DNS TTL (Time To Live) a critical factor in determining failover RTO during disaster recovery?',
      'How does failback to the primary region work after the regional outage is resolved, and how is split-brain avoided?'
    ],
    commonPitfalls: [
      'Setting long DNS TTLs (e.g. 86400s / 24 hours), causing client resolvers to cache the dead IP long after failover.',
      'Failing to replicate KMS encryption keys across regions, causing encrypted volumes to fail to attach in the secondary region.',
      'Testing disaster recovery only in theory without ever running live failover drills.'
    ],
    optionalEnhancements: {
      beginner: ['Configure automated SNS email alerts upon Route 53 health check failure.'],
      intermediate: ['Implement automated CloudFront global edge caching fronting both regions.'],
      advanced: ['Build an automated Terraform script that re-synchronizes data back to the primary region after recovery.'],
      expert: ['Transition architecture from Active-Passive to Active-Active Multi-Region using Amazon Aurora Global Database.']
    },
    completionChecklist: [
      'Multi-region Terraform architecture deployed across primary and secondary regions',
      'Dual provider aliases configured cleanly in providers.tf',
      'Cross-region database replication established and verified in sync',
      'Route 53 global DNS failover routing policy configured with health probes',
      'Live simulated disaster drill executed',
      'Replica promotion and DNS cutover completed with RTO < 15 minutes',
      'DISASTER_RECOVERY_RUNBOOK.md completed',
      'DISASTER_RECOVERY_DRILL_REPORT.md published'
    ]
  }
];

const allTerraformCapstones = [...terraformCapstones, ...remainingTerraformCapstones];

// Add legacy fields for backward compatibility
const enrichedCapstones = allTerraformCapstones.map((cap) => {
  return {
    ...cap,
    objectives: cap.projectObjective,
    startingState: {
      description: `Terraform workspace environment for ${cap.title}`,
      environment: 'Terraform 1.5+ CLI / Cloud Infrastructure Provider',
      startingFiles: {
        'main.tf': `# ${cap.title}\nterraform {\n  required_version = ">= 1.5.0"\n}\n`,
        'variables.tf': '# Input variables\n',
        'outputs.tf': '# Output definitions\n'
      }
    },
    tasks: cap.functionalRequirements.map((req, idx) => ({
      id: `task-${idx + 1}`,
      title: req,
      objective: req,
      commandSnippet: cap.resources.usefulCommands[idx % cap.resources.usefulCommands.length] || 'terraform plan',
      expectedOutput: 'Action completed successfully.',
      verificationCriteria: req
    })),
    failureScenarios: [
      {
        id: 'fail-1',
        title: cap.commonPitfalls[0] || 'Terraform state lock or provider error',
        symptom: 'Terraform operation fails with state lock error or provider authentication failure.',
        rootCause: 'Concurrent operation holding lock or expired credentials.',
        diagnosticCommand: 'terraform plan',
        fixCommand: 'terraform force-unlock <LOCK_ID> || terraform init',
        verification: 'Terraform plan executes successfully.'
      },
      {
        id: 'fail-2',
        title: cap.commonPitfalls[1] || 'Syntax or validation failure',
        symptom: 'terraform validate fails with HCL parse error or type mismatch.',
        rootCause: 'Invalid attribute name, wrong variable type, or syntax error.',
        diagnosticCommand: 'terraform validate',
        fixCommand: 'terraform fmt && terraform validate',
        verification: 'Configuration is valid.'
      }
    ],
    validationChecks: cap.completionChecklist.map((check, idx) => ({
      id: `val-${idx + 1}`,
      label: check,
      verificationCommand: 'terraform validate',
      points: Math.round(100 / cap.completionChecklist.length)
    })),
    scoreMax: 100
  };
});

const outPath = path.join(__dirname, '../data/terraformCapstones.ts');
const fileContent = `import { CapstoneProject } from '../types';\n\nexport const TERRAFORM_CAPSTONES: CapstoneProject[] = ${JSON.stringify(enrichedCapstones, null, 2)};\n`;

fs.writeFileSync(outPath, fileContent, 'utf-8');
console.log(`Successfully generated 10 Terraform Capstones at ${outPath}`);
