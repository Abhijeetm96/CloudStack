// Generator script for Kubernetes Capstones 01 through 10
const fs = require('fs');
const path = require('path');

const kubernetesCapstones = [
  {
    id: 'k8s-01',
    code: 'K8S-01',
    title: 'Deploy a Containerized Application to Kubernetes',
    academy: 'kubernetes',
    difficulty: 'Beginner',
    estimatedTime: '4-6 hours',
    technologies: ['Kubernetes', 'kubectl', 'Pods', 'Services (ClusterIP / NodePort)', 'YAML Manifests'],
    overview: 'Deploy a containerized application to a Kubernetes cluster using declarative YAML manifests, inspect pod scheduling, and expose the workload internally and externally using Kubernetes Services.',
    tags: ['kubernetes', 'k8s', 'pods', 'services', 'kubectl', 'manifests'],
    projectOverview: {
      projectName: 'Deploy a Containerized Application to Kubernetes',
      academy: 'kubernetes',
      difficulty: 'Beginner',
      estimatedEffort: '4-6 hours',
      technologies: ['Kubernetes 1.28+', 'kubectl CLI', 'Pod Manifests', 'ClusterIP / NodePort Service'],
      shortDescription: 'Author declarative Kubernetes Pod and Service manifests, deploy them to a cluster using kubectl, and test internal and external network connectivity.'
    },
    scenario: 'Your organization is migrating from standalone Docker engines to Kubernetes. As a junior platform engineer, you have been tasked with deploying the team\'s first microservice into a local development cluster (Minikube or Kind), verifying pod scheduling, and exposing the service so other cluster workloads can query it.',
    problemStatement: 'Direct container execution lacks self-healing, automated DNS discovery, and declarative cluster management. Deploying on Kubernetes requires authoring declarative YAML manifests for Pods and Services and understanding how the kube-proxy and kube-dns layers route traffic.',
    projectObjective: [
      'Write declarative Kubernetes manifests for a Pod and a Service (ClusterIP and NodePort)',
      'Deploy the manifests using kubectl apply -f manifest.yaml',
      'Inspect pod lifecycle states (Pending, ContainerCreating, Running) using kubectl get pods and kubectl describe pod',
      'Expose the application through a Kubernetes Service and verify DNS name resolution (service-name.namespace.svc.cluster.local)'
    ],
    whatYouNeedToBuild: {
      description: 'A Kubernetes Pod running a web container fronted by a Kubernetes Service routing traffic to the Pod IP.',
      diagram: `External / Node Traffic
           │
           ▼ (NodePort: 30080 or Port-Forward)
[Kubernetes Service: web-service] (ClusterIP: 10.96.12.45)
           │ (Label Selector: app=web)
           ▼
[Kubernetes Pod: web-pod] (Pod IP: 10.244.1.5)
└── Container: [nginx:alpine or node-app:1.0] (Port 80)`
    },
    requirements: {
      functional: [
        'Pod must start up and reach the Running state with 1/1 containers Ready',
        'Service must discover the Pod using label selectors (app: web)',
        'Application must return HTTP 200 when queried via Service ClusterIP or kubectl port-forward'
      ],
      technical: [
        'Define apiVersion: v1 for both Pod and Service',
        'Specify container resources (requests/limits) and containerPort: 80',
        'Use kubectl apply -f to deploy rather than imperative kubectl run'
      ],
      security: [
        'Deploy into a dedicated non-default namespace (web-apps)',
        'Do not run container with privileged: true'
      ]
    },
    architecture: {
      summary: 'Foundational Kubernetes architecture coupling kube-apiserver manifest intake, kube-scheduler placement, and kube-proxy Service IP table programming.',
      diagram: `kubectl ──> kube-apiserver ──> etcd ──> kube-scheduler ──> kubelet (Node) ──> Pod Container`,
      components: [
        { name: 'kube-apiserver', role: 'REST endpoint validating and configuring data for pods and services', technologies: ['Kubernetes API'] },
        { name: 'Pod Object', role: 'Atomic unit of scheduling sharing network namespace and storage volumes', technologies: ['Pod Spec'] },
        { name: 'ClusterIP Service', role: 'Stable virtual IP providing L4 load balancing across matching pods', technologies: ['kube-proxy', 'iptables'] }
      ]
    },
    technologyRequirements: {
      required: ['Kubernetes cluster (Minikube, Kind, k3s, or Docker Desktop Kubernetes)', 'kubectl CLI 1.28+'],
      optional: ['k9s terminal UI for interactive cluster inspection'],
      outOfScope: ['Production Ingress Controllers (covered in K8S-06)']
    },
    functionalRequirements: [
      'Create namespace: kubectl create namespace web-apps',
      'Create pod.yaml deploying nginx:alpine with label app: web in namespace web-apps',
      'Create service.yaml declaring a ClusterIP service targeting port 80 with selector app: web',
      'Deploy manifests: kubectl apply -f pod.yaml -f service.yaml',
      'Inspect endpoints: kubectl get endpoints -n web-apps web-service (must show Pod IP)',
      'Test connectivity via kubectl port-forward -n web-apps pod/web-pod 8080:80',
      'Execute curl -I http://localhost:8080 and confirm HTTP 200 OK'
    ],
    technicalRequirements: [
      'Verify pod logs: kubectl logs -n web-apps web-pod',
      'Inspect pod lifecycle details: kubectl describe pod -n web-apps web-pod',
      'Clean teardown: kubectl delete -f pod.yaml -f service.yaml'
    ],
    securityRequirements: [
      'Verify container runs with allowPrivilegeEscalation: false'
    ],
    constraints: [
      'Do not use naked imperative commands like "kubectl run" for production deliverables; declarative YAML manifests are mandatory',
      'Do not deploy resources into the default namespace'
    ],
    expectedOutcome: 'A fully validated declarative deployment of a Kubernetes Pod and Service with verified internal network discovery and port forwarding.',
    deliverables: [
      'Declarative pod manifest (pod.yaml)',
      'Declarative service manifest (service.yaml)',
      'K8S_DEPLOYMENT_REPORT.md detailing kubectl describe outputs, endpoints list, and curl verification'
    ],
    suggestedProjectStructure: `k8s-basic-deployment/
├── namespace.yaml
├── pod.yaml
├── service.yaml
└── K8S_DEPLOYMENT_REPORT.md`,
    requiredConcepts: [
      { name: 'Pods: Running Applications', lessonId: 'c-pods-running-apps', academyRoute: '/kubernetes' },
      { name: 'Kubernetes Workloads & Architecture', lessonId: 'c-k8s-architecture-core', academyRoute: '/kubernetes' },
      { name: 'Services & Networking Basics', lessonId: 'c-services-networking-core', academyRoute: '/kubernetes' }
    ],
    resources: {
      academyLessons: [
        { title: 'Chapter 02: Pods & Containers in K8s', route: '/cloudstack/kubernetes?concept=c-pods-running-apps' },
        { title: 'Chapter 01: Core Architecture & Components', route: '/cloudstack/kubernetes?concept=c-k8s-architecture-core' }
      ],
      officialDocs: [
        { title: 'Kubernetes Pods Documentation', url: 'https://kubernetes.io/docs/concepts/workloads/pods/' },
        { title: 'Kubernetes Services Documentation', url: 'https://kubernetes.io/docs/concepts/services-networking/service/' }
      ],
      referenceMaterial: ['Kubernetes: Up & Running (Kelsey Hightower et al.)'],
      usefulCommands: [
        'kubectl apply -f manifest.yaml',
        'kubectl get pods -A',
        'kubectl describe pod <pod_name>',
        'kubectl logs <pod_name>',
        'kubectl port-forward pod/<pod_name> 8080:80'
      ]
    },
    recommendedApproach: [
      '1. Start local Kubernetes cluster (minikube start or kind create cluster).',
      '2. Verify cluster nodes are Ready with kubectl get nodes.',
      '3. Create dedicated namespace manifest namespace.yaml and apply.',
      '4. Author pod.yaml declaring an Nginx container with labels and resource limits.',
      '5. Apply pod.yaml and monitor status until Running (kubectl get pods -w).',
      '6. Author service.yaml declaring a ClusterIP service selecting app: web.',
      '7. Apply service.yaml and verify that the Service Endpoints list includes the Pod IP.',
      '8. Forward local port to test pod HTTP endpoint (kubectl port-forward).',
      '9. Verify web page response via curl and check container logs with kubectl logs.',
      '10. Document findings in K8S_DEPLOYMENT_REPORT.md.'
    ],
    importantConsiderations: [
      'Why is running naked Pods directly in production considered an anti-pattern compared to Deployments?',
      'How does a Kubernetes Service match Pods using label selectors (matchLabels)?',
      'What happens to the Service Endpoints list if a Pod crashes or changes IP address?'
    ],
    commonPitfalls: [
      'Label selector mismatch between Service spec.selector and Pod metadata.labels, resulting in an empty Endpoints list (<none>).',
      'Deploying into default namespace, violating multi-tenant cluster hygiene.',
      'Forgetting containerPort in the pod spec, causing confusion during port-forwarding.'
    ],
    optionalEnhancements: {
      beginner: ['Deploy a temporary debugging container (nicolaka/netshoot) to test DNS resolution inside the cluster.'],
      intermediate: ['Change Service type from ClusterIP to NodePort (port 30080) and access via node IP.'],
      advanced: ['Add liveness and readiness HTTP probes to the Pod specification.'],
      expert: ['Inspect the underlying iptables/IPVS rules generated by kube-proxy on the node.']
    },
    completionChecklist: [
      'Dedicated namespace created and verified',
      'Declarative pod.yaml authored with resource limits and labels',
      'Declarative service.yaml authored with matching label selector',
      'Pod status reaches Running and 1/1 Ready',
      'kubectl get endpoints confirms Pod IP registered to Service',
      'kubectl port-forward verifies HTTP 200 response from web container',
      'K8S_DEPLOYMENT_REPORT.md published'
    ]
  },
  {
    id: 'k8s-02',
    code: 'K8S-02',
    title: 'Multi-Replica Application with Deployments & Rolling Updates',
    academy: 'kubernetes',
    difficulty: 'Beginner+',
    estimatedTime: '6-8 hours',
    technologies: ['Kubernetes Deployments', 'ReplicaSets', 'Rolling Updates', 'Rollbacks (undo)', 'Self-Healing'],
    overview: 'Deploy and operate a highly available, self-healing multi-replica workload using Kubernetes Deployments, executing zero-downtime rolling updates, observing ReplicaSet version transitions, and executing instantaneous automated rollbacks.',
    tags: ['kubernetes', 'deployments', 'replicasets', 'rolling-updates', 'self-healing', 'rollback'],
    projectOverview: {
      projectName: 'Multi-Replica Application with Deployments & Rolling Updates',
      academy: 'kubernetes',
      difficulty: 'Beginner+',
      estimatedEffort: '6-8 hours',
      technologies: ['Kubernetes Deployments', 'ReplicaSets', 'Rolling Update Strategy', 'kubectl rollout'],
      shortDescription: 'Orchestrate a self-healing 3-replica web deployment with automated zero-downtime rolling updates and instant rollback.'
    },
    scenario: 'In your company\'s previous setup, an engineer deleted a single pod by mistake and the entire service went down until someone noticed. Management has mandated that all applications must run with at least 3 replicas managed by Kubernetes Deployments, with self-healing pod recreation and zero-downtime rolling updates.',
    problemStatement: 'Standalone Pods do not possess self-healing capabilities: if a node fails or a pod is deleted, it is lost forever. Deployments provide declarative state management: they ensure the desired replica count is maintained at all times and orchestrate progressive rolling updates without downtime.',
    projectObjective: [
      'Author a declarative Kubernetes Deployment manifest maintaining 3 replicas',
      'Verify Kubernetes self-healing: manually delete a pod and observe the ReplicaSet controller instantly creating a replacement',
      'Execute a zero-downtime rolling update from v1.0 to v2.0 using maxSurge and maxUnavailable settings',
      'Simulate a failed deployment (broken image) and execute an automated rollback using kubectl rollout undo'
    ],
    whatYouNeedToBuild: {
      description: 'A 3-replica Kubernetes Deployment managed by ReplicaSets executing zero-downtime progressive rollouts.',
      diagram: `[Kubernetes Deployment: api-deployment] (replicas: 3)
                   │
                   ▼ (Controls)
[Active ReplicaSet: api-deployment-7b4d8f]
├── Pod 1 (Running) ──┐
├── Pod 2 (Running) ──┼──> [Service: api-service (Load Balances across all 3)]
└── Pod 3 (Running) ──┘
                   │
     (Rolling Update Triggered: image = api:v2.0)
                   │
                   ▼ (Spins up new ReplicaSet progressively)
[New ReplicaSet: api-deployment-6c9f2a]
├── Pod 1 (v2.0 Ready) ──> Terminating Old Pod 1
├── Pod 2 (v2.0 Ready) ──> Terminating Old Pod 2
└── Pod 3 (v2.0 Ready) ──> Terminating Old Pod 3 (ZERO DOWNTIME!)`
    },
    requirements: {
      functional: [
        'Deployment must maintain exactly 3 running pods across the cluster',
        'Deleting any pod via kubectl delete pod must trigger immediate recreation',
        'Updating image version must execute progressively with zero 502/503 dropped requests',
        'Rollback command must restore the previous stable ReplicaSet in < 5 seconds'
      ],
      technical: [
        'Use apiVersion: apps/v1 with kind: Deployment',
        'Configure strategy: type: RollingUpdate with maxSurge: 1 and maxUnavailable: 0',
        'Track rollout status with kubectl rollout status deployment/api-deployment'
      ],
      security: [
        'All pod replicas must run with securityContext: runAsNonRoot: true'
      ]
    },
    architecture: {
      summary: 'Hierarchical workload controller architecture where Deployments manage declarative updates to ReplicaSets, which reconcile Pod lifecycle states against etcd desired state.',
      diagram: `Deployment Controller ──> ReplicaSet Controller ──> Pod Replicas <── Service Endpoints`,
      components: [
        { name: 'Deployment Controller', role: 'State machine managing declarative rollout strategies and revision history', technologies: ['apps/v1'] },
        { name: 'ReplicaSet Controller', role: 'Reconciliation loop guaranteeing desired number of pod replicas are active', technologies: ['ReplicaSet'] },
        { name: 'Service Endpoint Controller', role: 'Continuously updates active pod IPs in the service routing table', technologies: ['Endpoints'] }
      ]
    },
    technologyRequirements: {
      required: ['Kubernetes cluster 1.28+', 'kubectl CLI'],
      optional: ['Apache Benchmark (ab) for traffic continuity testing during rollout'],
      outOfScope: ['Canary traffic splitting via Service Mesh (Istio)']
    },
    functionalRequirements: [
      'Author deployment.yaml with replicas: 3, image: nginx:1.24-alpine, and rolling update strategy',
      'Apply manifest and verify 3 pods running in kubectl get pods -l app=api',
      'Test self-healing: delete one pod (kubectl delete pod <name>) and observe instant recreation',
      'Update image to nginx:1.25-alpine using kubectl apply -f deployment.yaml',
      'Monitor rollout: kubectl rollout status deployment/api-deployment',
      'Verify two ReplicaSets exist in kubectl get rs (one old with 0 replicas, one new with 3)',
      'Trigger faulty update: set image to non-existent nginx:invalid-tag-999',
      'Observe ImagePullBackOff and execute emergency rollback: kubectl rollout undo deployment/api-deployment'
    ],
    technicalRequirements: [
      'Inspect rollout history: kubectl rollout history deployment/api-deployment',
      'Verify maxUnavailable: 0 guarantees at least 3 pods are always serving traffic'
    ],
    securityRequirements: [
      'Ensure pods drop all unneeded capabilities and run as unprivileged user'
    ],
    constraints: [
      'Do not set maxUnavailable: 100% (which would terminate all pods simultaneously, causing total outage)',
      'All rollout operations must maintain continuous service availability'
    ],
    expectedOutcome: 'A resilient, self-healing multi-replica workload capable of zero-downtime rolling updates and instantaneous failure rollbacks.',
    deliverables: [
      'Deployment manifest (deployment.yaml)',
      'Companion Service manifest (service.yaml)',
      'ROLLING_UPDATE_VERIFICATION.md documenting self-healing test, rollout progression timeline, and rollback commands'
    ],
    suggestedProjectStructure: `k8s-deployments/
├── deployment.yaml
├── service.yaml
└── ROLLING_UPDATE_VERIFICATION.md`,
    requiredConcepts: [
      { name: 'Deployments & Workloads', lessonId: 'c-deployments-workloads', academyRoute: '/kubernetes' },
      { name: 'ReplicaSets & Desired State', lessonId: 'c-replicasets-desired-state', academyRoute: '/kubernetes' },
      { name: 'Rolling Updates & Strategies', lessonId: 'c-rolling-updates-strategy', academyRoute: '/kubernetes' },
      { name: 'Rollbacks & Recovery', lessonId: 'c-rollbacks-recovery', academyRoute: '/kubernetes' }
    ],
    resources: {
      academyLessons: [
        { title: 'Chapter 02: Deployments & Workloads', route: '/cloudstack/kubernetes?concept=c-deployments-workloads' },
        { title: 'Chapter 02: ReplicaSets & Self-Healing', route: '/cloudstack/kubernetes?concept=c-replicasets-desired-state' },
        { title: 'Chapter 05: Rolling Updates & Zero-Downtime', route: '/cloudstack/kubernetes?concept=c-rolling-updates-strategy' }
      ],
      officialDocs: [
        { title: 'Kubernetes Deployments', url: 'https://kubernetes.io/docs/concepts/workloads/controllers/deployment/' },
        { title: 'Performing a Rolling Update', url: 'https://kubernetes.io/docs/tutorials/kubernetes-basics/update/update-intro/' }
      ],
      referenceMaterial: ['Production Kubernetes: Deploying Workloads (Brendan Burns)'],
      usefulCommands: [
        'kubectl rollout status deployment/<name>',
        'kubectl rollout history deployment/<name>',
        'kubectl rollout undo deployment/<name>',
        'kubectl rollout pause deployment/<name>',
        'kubectl rollout resume deployment/<name>'
      ]
    },
    recommendedApproach: [
      '1. Draft deployment.yaml with 3 replicas and image nginx:1.24-alpine.',
      '2. Configure strategy: type: RollingUpdate, maxSurge: 1, maxUnavailable: 0.',
      '3. Deploy to cluster and verify all 3 pods are Running.',
      '4. Delete one of the pods; immediately check kubectl get pods to witness automatic self-healing.',
      '5. Start continuous curl loop in another terminal against the service endpoint.',
      '6. Update deployment image to nginx:1.25-alpine and re-apply.',
      '7. Monitor the rollout status and verify zero connection drops in the curl loop.',
      '8. Inspect the two ReplicaSets (kubectl get rs) to observe the shifting pod allocation.',
      '9. Intentionally trigger a broken rollout with a corrupt image tag and execute kubectl rollout undo.',
      '10. Document all phases in ROLLING_UPDATE_VERIFICATION.md.'
    ],
    importantConsiderations: [
      'How does maxSurge: 1 and maxUnavailable: 0 guarantee zero downtime during updates?',
      'Why does a Deployment maintain multiple ReplicaSets in the cluster even after an update completes?',
      'What happens if an application version boots up but fails its readiness probe during a rolling update?'
    ],
    commonPitfalls: [
      'Setting maxUnavailable equal to replica count, terminating all pods and causing total downtime during updates.',
      'Failing to specify readiness probes, causing Kubernetes to route traffic to new pods before the application is ready.',
      'Hardcoding latest tag on images, preventing Kubernetes from detecting that the image specification has changed.'
    ],
    optionalEnhancements: {
      beginner: ['Scale the deployment dynamically using kubectl scale deployment/api-deployment --replicas=5.'],
      intermediate: ['Configure revisionHistoryLimit: 5 to clean up old ReplicaSet objects automatically.'],
      advanced: ['Use kubectl rollout pause and resume to conduct a manual canary rollout on 1 replica.'],
      expert: ['Inspect the rollout events stream in real time using kubectl get events --watch.']
    },
    completionChecklist: [
      'Deployment created with 3 replicas and verified running',
      'Self-healing verified: deleted pod replaced automatically within seconds',
      'Rolling update strategy configured with maxSurge: 1 and maxUnavailable: 0',
      'Rolling update to new version executed with zero downtime verified',
      'Old and new ReplicaSets inspected in cluster',
      'Simulated deployment failure successfully rolled back with kubectl rollout undo',
      'ROLLING_UPDATE_VERIFICATION.md published'
    ]
  }
];

// Append remaining 8 projects for Kubernetes (03 to 10)
const remainingK8sCapstones = [
  {
    id: 'k8s-03',
    code: 'K8S-03',
    title: 'Application Configuration & Secrets Management (ConfigMaps & Secrets)',
    academy: 'kubernetes',
    difficulty: 'Lower Intermediate',
    estimatedTime: '8-10 hours',
    technologies: ['ConfigMaps', 'Secrets', 'Environment Variable Injection', 'Volume Mounts', 'Live Reloading'],
    overview: 'Decouple application configuration from container images using Kubernetes ConfigMaps and Secrets, implementing environment variable injection, mounted configuration files, and zero-restart live reload patterns.',
    tags: ['kubernetes', 'configmaps', 'secrets', 'configuration', '12-factor', 'security'],
    projectOverview: {
      projectName: 'Application Configuration & Secrets Management',
      academy: 'kubernetes',
      difficulty: 'Lower Intermediate',
      estimatedEffort: '8-10 hours',
      technologies: ['ConfigMaps', 'Opaque Secrets', 'Volume Mounts', 'envFrom'],
      shortDescription: 'Decouple configuration and sensitive credentials from container images using ConfigMaps and Secrets, mounted as environment variables and files.'
    },
    scenario: 'Your application currently hardcodes database passwords and API endpoints directly inside source code and Dockerfiles. A developer accidentally pushed a container image containing production database credentials to a public registry. You must refactor the application to follow 12-Factor principles by externalizing configuration into Kubernetes ConfigMaps and Secrets.',
    problemStatement: 'Baking configuration into images creates security vulnerabilities, prevents image reuse across environments (Dev, Staging, Prod), and requires rebuilding container images just to change a log level or database endpoint. Configuration must be decoupled into native Kubernetes primitives.',
    projectObjective: [
      'Create and manage Kubernetes ConfigMaps from literal values, property files, and directories',
      'Create and manage Kubernetes Secrets (type: Opaque) storing base64-encoded credentials',
      'Inject configuration into pods via environment variables (valueFrom / envFrom)',
      'Mount ConfigMaps and Secrets as configuration files inside pods via volume mounts',
      'Demonstrate atomic updates: update a ConfigMap and observe changes reflected inside mounted files'
    ],
    whatYouNeedToBuild: {
      description: 'A microservice deployment consuming non-sensitive configuration from ConfigMaps and sensitive credentials from Secrets via env vars and volume mounts.',
      diagram: `[ConfigMap: app-config]                          [Secret: app-secrets]
├── APP_ENV = "production"                       ├── DB_PASSWORD = "super-secret-pass"
├── LOG_LEVEL = "info"                           └── JWT_SECRET = "token-signing-key"
└── config.json (Mounted as File)
                 │                                                │
                 └───────────────────────┬────────────────────────┘
                                         ▼
                   [Kubernetes Pod: backend-service]
                   ├── Environment Variables:
                   │   ├── APP_ENV, LOG_LEVEL (from ConfigMap)
                   │   └── DB_PASSWORD (from Secret)
                   └── Mounted Volumes:
                       ├── /etc/config/config.json (from ConfigMap)
                       └── /etc/secrets/jwt.key (from Secret: mode 0400)`
    },
    requirements: {
      functional: [
        'Application must boot successfully reading environment variables from ConfigMap and Secret',
        'Application must read JSON configuration mounted from ConfigMap at /etc/config/config.json',
        'Sensitive values must never appear in plaintext inside deployment YAML manifests'
      ],
      technical: [
        'Use apiVersion: v1 for ConfigMap and Secret',
        'Use secretKeyRef and configMapKeyRef in pod env blocks, or envFrom',
        'Configure volume mount with readOnly: true for sensitive file mounts'
      ],
      security: [
        'Mount secret files with restrictive defaultMode (e.g. 0400)',
        'Do not commit raw base64 secrets into version control'
      ]
    },
    architecture: {
      summary: 'Declarative configuration management architecture decoupling application binaries from dynamic runtime parameters using virtual tmpfs volume projections.',
      diagram: `ConfigMap & Secret Objects (etcd) ──> kubelet volume projection / env injection ──> Container Runtime`,
      components: [
        { name: 'ConfigMap Primitive', role: 'Key-value store for non-sensitive configuration parameters and configuration files', technologies: ['v1/ConfigMap'] },
        { name: 'Secret Primitive', role: 'Encrypted at rest (in etcd) key-value store for sensitive passwords, tokens, and TLS keys', technologies: ['v1/Secret'] },
        { name: 'Volume Projection Engine', role: 'Virtual filesystem projection engine materializing keys into directory files inside containers', technologies: ['tmpfs projection'] }
      ]
    },
    technologyRequirements: {
      required: ['Kubernetes cluster 1.28+', 'kubectl CLI'],
      optional: ['SealedSecrets or External Secrets Operator for GitOps compatibility'],
      outOfScope: ['Hardware Security Module (HSM) key management']
    },
    functionalRequirements: [
      'Create configmap.yaml with application settings and an embedded nginx.conf or config.json',
      'Create secret.yaml with base64 encoded database credentials',
      'Create deployment.yaml referencing ConfigMap and Secret via both env and volumeMounts',
      'Apply manifests and verify pod reaches Running state',
      'Verify environment variables: kubectl exec -it <pod_name> -- printenv | grep APP_',
      'Verify mounted files: kubectl exec -it <pod_name> -- cat /etc/config/config.json',
      'Update ConfigMap value and verify that mounted file updates automatically in the container without restart'
    ],
    technicalRequirements: [
      'Inspect secret metadata: kubectl describe secret app-secrets (values must remain masked)',
      'Confirm mounted secret file permissions: ls -l /etc/secrets (mode must be -r--------)'
    ],
    securityRequirements: [
      'Ensure pods cannot read secrets from other namespaces (namespace boundary isolation)'
    ],
    constraints: [
      'Do not store plaintext passwords in ConfigMaps',
      'Do not commit secret.yaml containing real secrets to Git repositories'
    ],
    expectedOutcome: 'A 12-Factor compliant Kubernetes application architecture with clean separation of code and configuration, dynamic credential injection, and secure volume projections.',
    deliverables: [
      'Declarative ConfigMap manifest (configmap.yaml)',
      'Declarative Secret manifest template (secret.example.yaml)',
      'Deployment manifest utilizing envFrom and volumeMounts (deployment.yaml)',
      'CONFIG_MANAGEMENT_PLAYBOOK.md detailing injection patterns, live updating behavior, and security guidelines'
    ],
    suggestedProjectStructure: `k8s-config/
├── configmap.yaml
├── secret.example.yaml
├── deployment.yaml
├── .gitignore
└── CONFIG_MANAGEMENT_PLAYBOOK.md`,
    requiredConcepts: [
      { name: 'ConfigMaps & Secrets', lessonId: 'c-configmaps-secrets', academyRoute: '/kubernetes' },
      { name: 'Pods & Containers', lessonId: 'c-pods-running-apps', academyRoute: '/kubernetes' },
      { name: 'Deployments & Workloads', lessonId: 'c-deployments-workloads', academyRoute: '/kubernetes' }
    ],
    resources: {
      academyLessons: [
        { title: 'Chapter 02: ConfigMaps & Secrets', route: '/cloudstack/kubernetes?concept=c-configmaps-secrets' },
        { title: 'Chapter 02: Deployments & Pods', route: '/cloudstack/kubernetes?concept=c-deployments-workloads' }
      ],
      officialDocs: [
        { title: 'Kubernetes ConfigMaps', url: 'https://kubernetes.io/docs/concepts/configuration/configmap/' },
        { title: 'Kubernetes Secrets', url: 'https://kubernetes.io/docs/concepts/configuration/secret/' }
      ],
      referenceMaterial: ['The Twelve-Factor App: Config (12factor.net/config)'],
      usefulCommands: [
        'kubectl create configmap app-config --from-literal=ENV=prod --from-literal=PORT=8080',
        'kubectl create secret generic app-secrets --from-literal=PASSWORD=secret123',
        'kubectl get configmaps,secrets',
        'kubectl exec <pod> -- env'
      ]
    },
    recommendedApproach: [
      '1. Identify all configurable parameters in the application and categorize into non-sensitive vs sensitive.',
      '2. Author configmap.yaml containing both scalar environment variables and a structured configuration file.',
      '3. Author secret.example.yaml containing required secret keys.',
      '4. Author deployment.yaml mounting the ConfigMap and Secret via env and volumeMounts.',
      '5. Apply all manifests to the cluster and verify pod status.',
      '6. Execute printenv inside the container using kubectl exec to confirm environment variable injection.',
      '7. Execute cat /etc/config/config.json to confirm file projection.',
      '8. Update the ConfigMap on the cluster and observe the automated propagation to mounted files.',
      '9. Verify that environment variables do not automatically update without pod restart (differentiating env from volume behavior).',
      '10. Author CONFIG_MANAGEMENT_PLAYBOOK.md.'
    ],
    importantConsiderations: [
      'Why do mounted ConfigMap files update automatically in containers, while environment variables require a pod restart to refresh?',
      'Why is base64 encoding in Kubernetes Secrets NOT encryption, and how should etcd encryption at rest be enabled?',
      'What are the advantages of using immutable ConfigMaps (immutable: true) in high-scale clusters?'
    ],
    commonPitfalls: [
      'Mistaking base64 encoding for encryption and committing raw Secret YAML files to public Git repos.',
      'Updating a ConfigMap used as environment variables and expecting running pods to automatically pick up changes without a rollout restart.',
      'Mounting a ConfigMap over an existing non-empty directory in a container, hiding the underlying files.'
    ],
    optionalEnhancements: {
      beginner: ['Use subPath in volumeMounts to mount a single file into a directory without overwriting sibling files.'],
      intermediate: ['Configure immutable: true on the ConfigMap and observe performance and safety benefits.'],
      advanced: ['Integrate Reloader controller (stakater/reloader) to automatically trigger rolling updates when ConfigMaps change.'],
      expert: ['Deploy HashiCorp Vault Secrets Operator or SealedSecrets to manage GitOps-encrypted secrets.']
    },
    completionChecklist: [
      'ConfigMap created containing scalar values and configuration file data',
      'Secret created storing sensitive credentials',
      'Deployment successfully consumes parameters via both env and volumeMounts',
      'kubectl exec confirms environment variables injected accurately',
      'kubectl exec confirms configuration files projected into container directory',
      'ConfigMap update tested and live file update observed',
      'CONFIG_MANAGEMENT_PLAYBOOK.md published'
    ]
  },
  {
    id: 'k8s-04',
    code: 'K8S-04',
    title: 'Persistent Storage with PersistentVolumes, PVCs & StatefulSets',
    academy: 'kubernetes',
    difficulty: 'Intermediate',
    estimatedTime: '8-12 hours',
    technologies: ['PersistentVolumes (PV)', 'PersistentVolumeClaims (PVC)', 'StorageClasses', 'StatefulSets', 'Dynamic Provisioning'],
    overview: 'Implement enterprise stateful storage architectures in Kubernetes using StorageClasses, PersistentVolumeClaims (PVCs), dynamic storage provisioning, and StatefulSets for ordered, persistent stateful database workloads.',
    tags: ['kubernetes', 'storage', 'pv', 'pvc', 'statefulsets', 'storageclass', 'persistence'],
    projectOverview: {
      projectName: 'Persistent Storage with PVs, PVCs & StatefulSets',
      academy: 'kubernetes',
      difficulty: 'Intermediate',
      estimatedEffort: '8-12 hours',
      technologies: ['StorageClass', 'PVC / PV', 'StatefulSet', 'PostgreSQL Stateful Pod'],
      shortDescription: 'Configure production-grade persistent storage for stateful workloads using dynamic StorageClasses, PersistentVolumeClaims, and StatefulSets.'
    },
    scenario: 'Your database team deployed PostgreSQL on Kubernetes using a standard Deployment and an emptyDir volume. When the pod crashed and was restarted on another worker node, the entire database was lost. You must re-architect the database workload using PersistentVolumes, PersistentVolumeClaims, and a StatefulSet to guarantee data persistence.',
    problemStatement: 'Pods are ephemeral by nature: when a pod terminates, its local filesystem is destroyed. Stateful applications (databases, message queues) require persistent storage that exists independently of the pod lifecycle and reattaches seamlessly across pod restarts and node failures.',
    projectObjective: [
      'Configure a dynamic StorageClass with volumeBindingMode: WaitForFirstConsumer',
      'Create a PersistentVolumeClaim (PVC) requesting 5Gi of persistent block storage',
      'Deploy a PostgreSQL database using a StatefulSet (kind: StatefulSet) with volumeClaimTemplates',
      'Populate test database records, delete the database pod, and prove 100% data persistence upon pod recreation',
      'Verify ordered startup and stable network identities (pod-0, pod-1) provided by StatefulSets'
    ],
    whatYouNeedToBuild: {
      description: 'A stateful PostgreSQL deployment backed by dynamic persistent volume provisioning and a headless service for stable network identity.',
      diagram: `[StatefulSet: db-postgres] (replicas: 1)
├── Headless Service: [postgres-headless] (ClusterIP: None)
└── Pod: [db-postgres-0] (Stable Identity)
          │
     (Mounts: /var/lib/postgresql/data)
          │
          ▼
[PersistentVolumeClaim: data-db-postgres-0]
          │ (Bound via StorageClass: standard)
          ▼
[PersistentVolume: pvc-8f4b21-4a...] (Retain / Delete Policy)
          │
          ▼ (Real Storage)
[Host Directory / Cloud EBS Block Storage] ──> Data survives pod recreation!`
    },
    requirements: {
      functional: [
        'Database data must survive pod deletion (kubectl delete pod db-postgres-0)',
        'Storage must be provisioned dynamically when the PVC is created without manual PV creation',
        'StatefulSet pods must possess predictable hostnames (db-postgres-0) resolvable via headless service'
      ],
      technical: [
        'Use kind: StatefulSet with serviceName: postgres-headless',
        'Implement volumeClaimTemplates inside the StatefulSet specification',
        'Configure accessModes: [ReadWriteOnce] and storage: 5Gi'
      ],
      security: [
        'Configure fsGroup: 999 (postgres) in pod securityContext so database process can write to mounted volume'
      ]
    },
    architecture: {
      summary: 'Stateful container storage architecture decoupling compute pods from underlying physical storage volumes using dynamic CSI storage driver provisioning.',
      diagram: `StatefulSet Controller ──> volumeClaimTemplate ──> CSI Driver Provisioner ──> Bound PV ──> Mounted Block Device`,
      components: [
        { name: 'StorageClass', role: 'Storage profile defining provisioner (CSI driver), reclaim policy, and mount options', technologies: ['StorageClass'] },
        { name: 'PersistentVolumeClaim (PVC)', role: 'Storage request by a workload defining access mode and capacity', technologies: ['PVC'] },
        { name: 'StatefulSet Controller', role: 'Workload manager providing ordered deployment, unique network identities, and dedicated storage per replica', technologies: ['StatefulSet'] },
        { name: 'Headless Service', role: 'Service with clusterIP: None generating direct DNS A records for individual stateful pods', technologies: ['Headless Service'] }
      ]
    },
    technologyRequirements: {
      required: ['Kubernetes cluster with dynamic provisioner (Minikube standard storageclass or cloud CSI)', 'kubectl CLI'],
      optional: ['PostgreSQL client (psql) inside pod'],
      outOfScope: ['Distributed multi-master Ceph storage clusters']
    },
    functionalRequirements: [
      'Create headless service postgres-headless with clusterIP: None',
      'Create statefulset.yaml for PostgreSQL 16 with volumeClaimTemplates mounting to /var/lib/postgresql/data',
      'Apply manifests and verify db-postgres-0 pod reaches Running state',
      'Verify PVC status: kubectl get pvc data-db-postgres-0 (Status must be Bound)',
      'Connect to database: kubectl exec -it db-postgres-0 -- psql -U postgres',
      'Create a table customers and insert 3 rows',
      'Kill pod: kubectl delete pod db-postgres-0',
      'Observe StatefulSet recreates db-postgres-0 and re-attaches the existing PV',
      'Query the database and verify all 3 rows are intact'
    ],
    technicalRequirements: [
      'Verify volume reclaim policy: kubectl get pv',
      'Verify DNS resolution of headless service: nslookup db-postgres-0.postgres-headless'
    ],
    securityRequirements: [
      'Ensure securityContext specifies runAsUser: 999 and fsGroup: 999'
    ],
    constraints: [
      'Do not use emptyDir or hostPath for production stateful workloads',
      'Do not use Deployments for stateful databases that require stable persistent storage per replica'
    ],
    expectedOutcome: 'A robust, persistent stateful database deployment on Kubernetes with dynamically provisioned storage, verified data persistence, and stable network identity.',
    deliverables: [
      'Headless Service manifest (service-headless.yaml)',
      'StatefulSet manifest with volumeClaimTemplates (statefulset.yaml)',
      'STATEFUL_STORAGE_AUDIT.md documenting PVC binding, data persistence verification, and pod recovery logs'
    ],
    suggestedProjectStructure: `k8s-stateful/
├── service-headless.yaml
├── statefulset.yaml
├── init-db.sql
└── STATEFUL_STORAGE_AUDIT.md`,
    requiredConcepts: [
      { name: 'Persistent Storage (PV & PVC)', lessonId: 'c-persistent-storage-pv-pvc', academyRoute: '/kubernetes' },
      { name: 'StatefulSets & Persistent Apps', lessonId: 'c-statefulsets-persistent-apps', academyRoute: '/kubernetes' },
      { name: 'Storage Fundamentals in K8s', lessonId: 'c-k8s-storage-fundamentals', academyRoute: '/kubernetes' },
      { name: 'CSI Drivers & StorageClasses', lessonId: 'c-csi-drivers-storage', academyRoute: '/kubernetes' }
    ],
    resources: {
      academyLessons: [
        { title: 'Chapter 04: Persistent Storage (PV, PVC, StorageClass)', route: '/cloudstack/kubernetes?concept=c-persistent-storage-pv-pvc' },
        { title: 'Chapter 02: StatefulSets & Persistent Applications', route: '/cloudstack/kubernetes?concept=c-statefulsets-persistent-apps' },
        { title: 'Chapter 04: CSI Drivers & Dynamic Provisioning', route: '/cloudstack/kubernetes?concept=c-csi-drivers-storage' }
      ],
      officialDocs: [
        { title: 'Kubernetes Persistent Volumes', url: 'https://kubernetes.io/docs/concepts/storage/persistent-volumes/' },
        { title: 'Kubernetes StatefulSets', url: 'https://kubernetes.io/docs/concepts/workloads/controllers/statefulset/' }
      ],
      referenceMaterial: ['Managing Stateful Applications in Kubernetes'],
      usefulCommands: [
        'kubectl get storageclass',
        'kubectl get pv,pvc',
        'kubectl describe pvc <pvc_name>',
        'kubectl delete pod db-postgres-0'
      ]
    },
    recommendedApproach: [
      '1. Inspect available StorageClasses in the cluster using kubectl get storageclass.',
      '2. Author service-headless.yaml declaring a Service with clusterIP: None.',
      '3. Author statefulset.yaml declaring PostgreSQL with volumeClaimTemplates.',
      '4. Configure securityContext with fsGroup: 999 to guarantee correct volume permissions.',
      '5. Apply manifests and monitor pod creation: kubectl get pods -l app=postgres -w.',
      '6. Verify PVC creation and status: kubectl get pvc (confirm Status is Bound).',
      '7. Execute interactive psql session, create test table, and insert records.',
      '8. Delete the running pod db-postgres-0 using kubectl delete pod.',
      '9. Observe the StatefulSet controller recreating the pod and re-attaching the same PV.',
      '10. Query the database to verify zero data loss and author STATEFUL_STORAGE_AUDIT.md.'
    ],
    importantConsiderations: [
      'Why is a Headless Service mandatory for StatefulSets in Kubernetes?',
      'What is the difference between PersistentVolume reclaim policies Retain, Delete, and Recycle?',
      'Why does volumeBindingMode: WaitForFirstConsumer prevent storage topology placement failures?'
    ],
    commonPitfalls: [
      'Permission denied errors when the database process cannot write to the root-owned volume mount (solved by fsGroup).',
      'Using a Deployment with multiple replicas sharing a ReadWriteOnce PVC, causing pod scheduling deadlocks.',
      'Deleting a StatefulSet and expecting the PVCs to be deleted (PVCs are intentionally preserved to prevent accidental data loss).'
    ],
    optionalEnhancements: {
      beginner: ['Scale the StatefulSet to 2 replicas and observe the creation of data-db-postgres-1.'],
      intermediate: ['Configure volume expansion (allowVolumeExpansion: true) and expand the PVC online from 5Gi to 10Gi.'],
      advanced: ['Implement automated database backup cronjob dumping SQL to an independent backup PVC.'],
      expert: ['Deploy a clustered PostgreSQL solution (e.g. CloudNativePG or Zalando Postgres Operator) with automated replication.']
    },
    completionChecklist: [
      'StorageClass identified and verified active',
      'Headless Service created with clusterIP: None',
      'StatefulSet deployed with volumeClaimTemplates',
      'PVC dynamically provisioned and reached Bound state',
      'Database seeded with test records',
      'Pod deleted and recreated by StatefulSet controller',
      'Data persistence verified with zero data loss',
      'STATEFUL_STORAGE_AUDIT.md published'
    ]
  },
  {
    id: 'k8s-05',
    code: 'K8S-05',
    title: 'Production Application Hardening (Probes, Resources & PodSecurity)',
    academy: 'kubernetes',
    difficulty: 'Intermediate+',
    estimatedTime: '10-14 hours',
    technologies: ['Liveness & Readiness Probes', 'Startup Probes', 'Resource Requests & Limits', 'Pod Security Standards', 'SecurityContext'],
    overview: 'Harden Kubernetes application workloads for production environments, implementing three-tier health probes (Startup, Liveness, Readiness), precise CPU/memory resource allocations (requests/limits), and Pod Security Standards (Restricted profile).',
    tags: ['kubernetes', 'production', 'probes', 'resources', 'requests-limits', 'pod-security-standards', 'security-context'],
    projectOverview: {
      projectName: 'Production Application Hardening (Probes, Resources & PodSecurity)',
      academy: 'kubernetes',
      difficulty: 'Intermediate+',
      estimatedEffort: '10-14 hours',
      technologies: ['Startup/Liveness/Readiness Probes', 'CPU & Memory Requests/Limits', 'Pod Security Standards', 'securityContext'],
      shortDescription: 'Transform basic Kubernetes pods into hardened, production-ready workloads with multi-stage health probes, resource quotas, and restricted security contexts.'
    },
    scenario: 'During a traffic spike, an unconstrained application pod suffered a memory leak and consumed all available RAM on the worker node, crashing critical system daemons and taking down other services. Security auditing also revealed the pod was running as root with full Linux capabilities. You must harden the application deployment to meet enterprise production standards.',
    problemStatement: 'Unconstrained pods without resource limits can crash entire nodes through memory exhaustion. Workloads without health probes receive traffic before they are ready and fail to recover from deadlocks. Unhardened security contexts allow potential container breakouts to compromise host nodes.',
    projectObjective: [
      'Configure precise CPU and memory requests and limits to establish a Guaranteed/Burstable Quality of Service (QoS)',
      'Implement Startup, Liveness, and Readiness probes with appropriate thresholds and delays',
      'Harden the Pod securityContext adhering to the Kubernetes Pod Security Standard "restricted" profile',
      'Deploy into a namespace enforcing pod-security.kubernetes.io/enforce: restricted',
      'Simulate an application deadlock and verify that Kubernetes automatically detects failure and restarts the pod'
    ],
    whatYouNeedToBuild: {
      description: 'A production-hardened Kubernetes Deployment with comprehensive probes, resource boundaries, and non-root security contexts.',
      diagram: `[Hardened Pod: api-service] (Namespace: pod-security: restricted)
├── Security Boundary:
│   ├── runAsNonRoot: true (UID: 10001)
│   ├── readOnlyRootFilesystem: true (tmpfs at /tmp)
│   ├── allowPrivilegeEscalation: false
│   └── capabilities: drop: ["ALL"]
│
├── Resource Guardrails:
│   ├── Requests: cpu: 100m, memory: 128Mi (Guaranteed scheduler placement)
│   └── Limits:   cpu: 500m, memory: 256Mi (Hard cap preventing node OOM)
│
└── Health Probes:
    ├── Startup Probe: /healthz (Waits for slow database bootstrap)
    ├── Liveness Probe: /healthz (Restarts pod if process deadlocks)
    └── Readiness Probe: /ready (Removes pod from Service Endpoints if overloaded)`
    },
    requirements: {
      functional: [
        'Application must not receive traffic until Readiness probe succeeds',
        'If application deadlocks, Liveness probe must fail and trigger an automated pod restart',
        'Container memory consumption must not exceed 256Mi (enforced by kernel cgroups)'
      ],
      technical: [
        'Configure startupProbe, livenessProbe, and readinessProbe under container spec',
        'Configure resources: requests and limits for cpu and memory',
        'Configure securityContext at both pod and container levels'
      ],
      security: [
        'Namespace must have label pod-security.kubernetes.io/enforce: restricted',
        'Drop all Linux capabilities (capabilities: drop: ["ALL"])',
        'Enforce read-only root filesystem with tmpfs scratch mount'
      ]
    },
    architecture: {
      summary: 'Production runtime governance architecture integrating kernel cgroup resource enforcement, kubelet probe state machines, and admission-time Pod Security Standards.',
      diagram: `Admission Webhook (PSS Restricted) ──> Scheduler (Resource Requests) ──> kubelet (Probes & cgroup limits)`,
      components: [
        { name: 'Pod Security Standards Admission', role: 'Validates that incoming pods adhere to privileged, baseline, or restricted security profiles', technologies: ['K8s PSS'] },
        { name: 'kubelet Probe Engine', role: 'Executes periodic HTTP/TCP probes against container ports and updates endpoint readiness', technologies: ['kubelet'] },
        { name: 'cgroups v2 Enforcement', role: 'Kernel control group enforcing CPU CFS quotas and killing processes that exceed memory limits', technologies: ['Linux cgroups'] }
      ]
    },
    technologyRequirements: {
      required: ['Kubernetes cluster 1.28+', 'kubectl CLI'],
      optional: ['Resource consumer test script to verify OOM kill behavior'],
      outOfScope: ['Third-party Kyverno / OPA Gatekeeper engines (covered in K8S-08)']
    },
    functionalRequirements: [
      'Create namespace production-workloads with label pod-security.kubernetes.io/enforce: restricted',
      'Author hardened deployment.yaml with resources, probes, and restricted securityContext',
      'Apply deployment and verify pods start successfully without admission rejection',
      'Verify QoS class is Burstable or Guaranteed: kubectl describe pod | grep "QoS Class"',
      'Simulate deadlock: hit endpoint causing /healthz to return HTTP 500; observe liveness probe failure and automatic restart',
      'Simulate memory overload: trigger memory leak script and observe OOMKilled event in kubectl get pods'
    ],
    technicalRequirements: [
      'Verify read-only rootfs: kubectl exec <pod> -- touch /etc/test (must fail with Read-only file system)',
      'Confirm non-root user: kubectl exec <pod> -- id (must show UID 10001)'
    ],
    securityRequirements: [
      'Confirm pod runs with allowPrivilegeEscalation: false and no setuid capabilities'
    ],
    constraints: [
      'Do not omit memory limits in production manifests',
      'Do not use identical endpoints with identical timeouts for both liveness and readiness probes'
    ],
    expectedOutcome: 'A production-certified Kubernetes workload resilient against memory starvation, process deadlocks, and container breakout security vulnerabilities.',
    deliverables: [
      'Hardened namespace manifest (namespace.yaml)',
      'Production deployment manifest (hardened-deployment.yaml)',
      'WORKLOAD_HARDENING_BENCHMARK.md documenting probe configuration, OOM kill simulation, and PSS restricted validation'
    ],
    suggestedProjectStructure: `production-hardening/
├── namespace.yaml
├── hardened-deployment.yaml
├── service.yaml
└── WORKLOAD_HARDENING_BENCHMARK.md`,
    requiredConcepts: [
      { name: 'Resource Requests & Limits', lessonId: 'c-resource-requests', academyRoute: '/kubernetes' },
      { name: 'CPU & Memory Allocation', lessonId: 'c-cpu-and-memory', academyRoute: '/kubernetes' },
      { name: 'Pod Security Standards', lessonId: 'c-pod-security-standards', academyRoute: '/kubernetes' },
      { name: 'Container Security Hardening', lessonId: 'c-container-security-hardening', academyRoute: '/kubernetes' }
    ],
    resources: {
      academyLessons: [
        { title: 'Chapter 03: Resource Requests & Limits', route: '/cloudstack/kubernetes?concept=c-resource-requests' },
        { title: 'Chapter 03: Pod Security Standards & Hardening', route: '/cloudstack/kubernetes?concept=c-pod-security-standards' },
        { title: 'Chapter 02: Health Probes & Lifecycle', route: '/cloudstack/kubernetes?concept=c-pods-running-apps' }
      ],
      officialDocs: [
        { title: 'Configure Liveness, Readiness and Startup Probes', url: 'https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-startup-probes/' },
        { title: 'Pod Security Standards', url: 'https://kubernetes.io/docs/concepts/security/pod-security-standards/' },
        { title: 'Resource Management for Pods and Containers', url: 'https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/' }
      ],
      referenceMaterial: ['Google Cloud: Best Practices for Operating Containers'],
      usefulCommands: [
        'kubectl describe pod <pod_name>',
        'kubectl get pods -o custom-columns=NAME:.metadata.name,QOS:.status.qosClass',
        'kubectl top pod <pod_name>',
        'kubectl get events --sort-by=.metadata.creationTimestamp'
      ]
    },
    recommendedApproach: [
      '1. Review Pod Security Standard Restricted profile requirements.',
      '2. Create namespace with pod-security.kubernetes.io/enforce: restricted label.',
      '3. Structure the hardened deployment manifest.',
      '4. Add securityContext blocks: runAsNonRoot, readOnlyRootFilesystem, drop ALL capabilities.',
      '5. Add tmpfs volume mount for /tmp to support application scratch files.',
      '6. Define precise resources requests and limits for CPU and memory.',
      '7. Configure Startup, Liveness, and Readiness probes with appropriate delays.',
      '8. Deploy to the restricted namespace and confirm admission controller accepts the pod.',
      '9. Simulate a process freeze; observe liveness probe failure in kubectl describe and witness automatic container restart.',
      '10. Author WORKLOAD_HARDENING_BENCHMARK.md.'
    ],
    importantConsiderations: [
      'Why is setting memory limits equal to memory requests (Guaranteed QoS) recommended for critical stateful databases?',
      'What is the catastrophic failure mode of using a Liveness probe that depends on an external database connection?',
      'How does a Startup probe protect slow-initializing legacy applications from premature Liveness kills?'
    ],
    commonPitfalls: [
      'Liveness probe checking downstream dependencies (e.g. database): if the database goes down, all pods restart simultaneously in a thundering herd cascade.',
      'Setting memory limits too low, causing the kernel OOM killer to immediately terminate the container on startup.',
      'Enabling readOnlyRootFilesystem without providing a writeable tmpfs mount for /tmp, causing applications to crash on boot.'
    ],
    optionalEnhancements: {
      beginner: ['Inspect the container QoS class using kubectl get pods -o jsonpath="{.items[*].status.qosClass}".'],
      intermediate: ['Configure a LimitRange object in the namespace enforcing default requests and limits.'],
      advanced: ['Configure a ResourceQuota on the namespace limiting total aggregate CPU and memory consumption.'],
      expert: ['Inspect the underlying cgroups memory.max and cpu.max files inside /sys/fs/cgroup on the worker node.']
    },
    completionChecklist: [
      'Namespace created with Pod Security Standards restricted profile enforcement',
      'securityContext configured with runAsNonRoot, readOnlyRootFilesystem, and capabilities drop',
      'CPU and memory requests and limits defined',
      'Startup, Liveness, and Readiness probes configured and tested',
      'Readiness probe removes unready pod from endpoints verified',
      'Liveness probe restarts frozen container verified',
      'QoS class evaluated and documented',
      'WORKLOAD_HARDENING_BENCHMARK.md published'
    ]
  },
  {
    id: 'k8s-06',
    code: 'K8S-06',
    title: 'Ingress Controllers, Path Routing & Network Policies',
    academy: 'kubernetes',
    difficulty: 'Advanced',
    estimatedTime: '10-14 hours',
    technologies: ['Ingress Controller (Nginx / Traefik)', 'Ingress Rules (Path / Host Routing)', 'NetworkPolicies', 'CNI Plugins (Calico / Cilium)', 'TLS Termination'],
    overview: 'Design, configure, and secure ingress and egress network traffic in Kubernetes, deploying an Ingress Controller with host and path-based routing, TLS termination, and zero-trust NetworkPolicies isolating microservices.',
    tags: ['kubernetes', 'ingress', 'networking', 'network-policies', 'path-routing', 'tls', 'security-isolation'],
    projectOverview: {
      projectName: 'Ingress Controllers, Path Routing & Network Policies',
      academy: 'kubernetes',
      difficulty: 'Advanced',
      estimatedEffort: '10-14 hours',
      technologies: ['Ingress Controller', 'Ingress Resources', 'Kubernetes NetworkPolicy', 'TLS Termination'],
      shortDescription: 'Deploy an Ingress Controller with path-based routing and TLS termination, and enforce zero-trust NetworkPolicies restricting inter-pod traffic.'
    },
    scenario: 'Your microservices platform was exposing every internal service via cloud load balancers (NodePort / LoadBalancer), costing thousands of dollars in cloud fees and exposing internal APIs directly to the internet. Furthermore, any compromised pod could connect to any other pod across the cluster. You must consolidate traffic through a single Ingress Controller and enforce zero-trust NetworkPolicies.',
    problemStatement: 'Creating individual cloud load balancers for each service is expensive and unmanageable. Without NetworkPolicies, the default Kubernetes network model is completely open: all pods can communicate with all other pods across all namespaces. Production requires ingress consolidation and firewalling.',
    projectObjective: [
      'Deploy and configure the Ingress-Nginx Controller (or Traefik) in the cluster',
      'Create an Ingress resource defining host-based (api.local) and path-based (/users, /orders) routing rules',
      'Configure TLS termination on the Ingress resource using a Kubernetes TLS Secret',
      'Implement a default-deny ingress and egress NetworkPolicy',
      'Create fine-grained NetworkPolicies allowing only authorized traffic flows (Frontend -> API -> DB)'
    ],
    whatYouNeedToBuild: {
      description: 'An ingress routing and network firewall architecture routing external traffic cleanly while enforcing strict zero-trust pod isolation.',
      diagram: `External HTTPS Client (https://api.local)
             │
             ▼ (Port 443, TLS Terminated)
[Ingress-Nginx Controller]
├── Host: api.local /users  ──> [Service: user-service] (Pods: app=users)
└── Host: api.local /orders ──> [Service: order-service] (Pods: app=orders)
             │
             ▼
[Zero-Trust NetworkPolicy Boundary]
├── [user-service] ──(ALLOWED via NetworkPolicy)──> [database-service] (Port 5432)
└── [public-frontend] ──X (BLOCKED by NetworkPolicy!) ──X [database-service]`
    },
    requirements: {
      functional: [
        'Ingress must route /users traffic to user-service and /orders traffic to order-service under the same domain',
        'Ingress must terminate TLS encryption and pass decrypted HTTP traffic to internal services',
        'NetworkPolicy must block unauthorized pods from communicating with database pods'
      ],
      technical: [
        'Use apiVersion: networking.k8s.io/v1 for both Ingress and NetworkPolicy',
        'Configure ingressClassName: nginx',
        'NetworkPolicy must specify podSelector, policyTypes: [Ingress, Egress], and ingress rules'
      ],
      security: [
        'Enforce default-deny all traffic in the namespace as baseline security policy',
        'Verify TLS secret is stored with type: kubernetes.io/tls'
      ]
    },
    architecture: {
      summary: 'Layer 7 reverse proxy routing architecture coupled with Layer 3/4 CNI packet filtering enforcing software-defined firewall perimeters.',
      diagram: `Client Request ──> Ingress Controller (L7 Nginx) ──> Cluster Service ──> [NetworkPolicy Packet Filter (Calico/Cilium iptables)] ──> Target Pod`,
      components: [
        { name: 'Ingress-Nginx Controller', role: 'Reverse proxy daemon watching Ingress API objects and updating dynamic upstream pools', technologies: ['Nginx', 'Lua'] },
        { name: 'Ingress Resource', role: 'Declarative routing specification mapping hostnames and URL paths to backend services', technologies: ['networking.k8s.io/v1'] },
        { name: 'NetworkPolicy Controller', role: 'CNI kernel agent enforcing packet filtering rules between pod network namespaces', technologies: ['Calico / Cilium / eBPF'] }
      ]
    },
    technologyRequirements: {
      required: ['Kubernetes cluster with CNI supporting NetworkPolicies (Calico, Cilium, or Minikube with --cni=calico)', 'kubectl CLI'],
      optional: ['openssl for self-signed TLS certificate generation'],
      outOfScope: ['BGP dynamic mesh routing']
    },
    functionalRequirements: [
      'Enable ingress controller (minikube addons enable ingress or apply ingress-nginx manifests)',
      'Generate self-signed TLS certificate for api.local and create secret tls-secret',
      'Deploy user-service and order-service with accompanying ClusterIP services',
      'Create ingress.yaml defining path-based routing (/users and /orders) with TLS secret attached',
      'Test ingress routing with curl -k -H "Host: api.local" https://<INGRESS_IP>/users',
      'Deploy database pod and test initial open network connectivity from frontend pod',
      'Apply default-deny NetworkPolicy; verify all inter-pod traffic is immediately blocked',
      'Apply allow-api-to-db NetworkPolicy; verify API pod can query DB while frontend remains blocked'
    ],
    technicalRequirements: [
      'Verify Ingress routing rules: kubectl describe ingress api-ingress',
      'Verify NetworkPolicy enforcement: test using curl or nc from different test pods'
    ],
    securityRequirements: [
      'Ensure TLS configuration disables insecure SSLv3 and TLS 1.0 protocols'
    ],
    constraints: [
      'Do not expose database services via Ingress',
      'NetworkPolicies must be tested on a cluster with a CNI that actually enforces them'
    ],
    expectedOutcome: 'A secure, unified ingress architecture routing multi-service APIs behind a single domain with mathematical zero-trust network policy isolation.',
    deliverables: [
      'Ingress manifest with TLS configuration (ingress.yaml)',
      'Microservice deployment and service manifests',
      'Zero-trust NetworkPolicy manifests (default-deny.yaml, allow-api-to-db.yaml)',
      'INGRESS_SECURITY_REPORT.md detailing path-based routing verification, TLS handshake logs, and network isolation matrix'
    ],
    suggestedProjectStructure: `k8s-networking/
├── ingress.yaml
├── services/
│   ├── users.yaml
│   ├── orders.yaml
│   └── database.yaml
├── policies/
│   ├── default-deny.yaml
│   └── allow-rules.yaml
└── INGRESS_SECURITY_REPORT.md`,
    requiredConcepts: [
      { name: 'Network Security Policies', lessonId: 'c-network-security-policies', academyRoute: '/kubernetes' },
      { name: 'Services & Networking Core', lessonId: 'c-services-networking-core', academyRoute: '/kubernetes' },
      { name: 'Production Application Operations', lessonId: 'c-cluster-operations-admin', academyRoute: '/kubernetes' }
    ],
    resources: {
      academyLessons: [
        { title: 'Chapter 03: Network Security Policies', route: '/cloudstack/kubernetes?concept=c-network-security-policies' },
        { title: 'Chapter 01: Core Networking & Services', route: '/cloudstack/kubernetes?concept=c-services-networking-core' }
      ],
      officialDocs: [
        { title: 'Kubernetes Ingress Documentation', url: 'https://kubernetes.io/docs/concepts/services-networking/ingress/' },
        { title: 'Kubernetes Network Policies', url: 'https://kubernetes.io/docs/concepts/services-networking/network-policies/' }
      ],
      referenceMaterial: ['Kubernetes Network Policy Recipes (Ahmet Alp Balkan)'],
      usefulCommands: [
        'kubectl get ingress',
        'kubectl describe ingress <name>',
        'kubectl get networkpolicies',
        'kubectl exec -it <pod> -- nc -zv <target_ip> <port>'
      ]
    },
    recommendedApproach: [
      '1. Verify cluster CNI supports NetworkPolicies (e.g. Calico).',
      '2. Install Ingress-Nginx controller and verify controller pod is Running.',
      '3. Generate self-signed TLS certificate and create Secret type kubernetes.io/tls.',
      '4. Deploy user-service, order-service, and database-service.',
      '5. Author ingress.yaml defining TLS termination, host api.local, and path rules for /users and /orders.',
      '6. Test Ingress routing using curl with custom Host header.',
      '7. Author and apply default-deny-all.yaml NetworkPolicy; confirm all inter-pod traffic halts.',
      '8. Author and apply specific ingress rule allowing user-service to communicate with database-service on port 5432.',
      '9. Verify that user-service can connect to database while order-service is blocked.',
      '10. Author INGRESS_SECURITY_REPORT.md.'
    ],
    importantConsiderations: [
      'Why do NetworkPolicies fail to take effect on default Minikube or basic cloud clusters without a policy-enabled CNI (Calico/Cilium)?',
      'How does an Ingress Controller differ fundamentally from a NodePort or LoadBalancer Service?',
      'Why is implementing a default-deny NetworkPolicy the cornerstone of zero-trust security in multi-tenant clusters?'
    ],
    commonPitfalls: [
      'Assuming NetworkPolicies are active when running a CNI that does not support them (e.g. default Flannel), leading to a false sense of security.',
      'Forgetting pathType: Prefix in Ingress rules, leading to exact-match routing failures.',
      'Locking oneself out of cluster DNS by applying a default-deny egress policy without explicitly allowing UDP port 53 to kube-dns.'
    ],
    optionalEnhancements: {
      beginner: ['Configure automated URL rewrite annotations in Ingress-Nginx (nginx.ingress.kubernetes.io/rewrite-target).'],
      intermediate: ['Configure Ingress rate-limiting annotations to mitigate denial-of-service traffic.'],
      advanced: ['Deploy Cert-Manager to automate Let\'s Encrypt TLS certificate issuance for Ingress.'],
      expert: ['Implement Cilium eBPF network policies with Layer 7 HTTP method filtering (e.g. allow GET, deny POST).']
    },
    completionChecklist: [
      'Ingress Controller deployed and running',
      'Self-signed TLS secret created and referenced in Ingress manifest',
      'Path-based routing (/users and /orders) verified returning correct service payloads',
      'TLS termination verified via HTTPS handshake',
      'Default-deny NetworkPolicy applied and verified blocking unauthorized traffic',
      'Granular NetworkPolicy applied and verified permitting only authorized service paths',
      'INGRESS_SECURITY_REPORT.md published'
    ]
  },
  {
    id: 'k8s-07',
    code: 'K8S-07',
    title: 'Autoscaling & High Availability (HPA, VPA & Cluster Autoscaler)',
    academy: 'kubernetes',
    difficulty: 'Advanced+',
    estimatedTime: '12-16 hours',
    technologies: ['Horizontal Pod Autoscaler (HPA)', 'Metrics Server', 'Custom Metrics', 'PodDisruptionBudgets (PDB)', 'Topology Spread Constraints'],
    overview: 'Design, configure, and validate an enterprise Kubernetes autoscaling architecture utilizing Metrics Server, Horizontal Pod Autoscaler (HPA v2), PodDisruptionBudgets (PDB), and Topology Spread Constraints for multi-zone fault tolerance.',
    tags: ['kubernetes', 'autoscaling', 'hpa', 'pdb', 'metrics-server', 'high-availability', 'topology-spread'],
    projectOverview: {
      projectName: 'Autoscaling & High Availability (HPA, VPA & Cluster Autoscaler)',
      academy: 'kubernetes',
      difficulty: 'Advanced+',
      estimatedEffort: '12-16 hours',
      technologies: ['Horizontal Pod Autoscaler (HPA)', 'Metrics Server', 'PodDisruptionBudget', 'Topology Spread'],
      shortDescription: 'Build an automated elastic scaling platform using HPA v2, Metrics Server, PodDisruptionBudgets, and Topology Spread Constraints.'
    },
    scenario: 'During a marketing campaign, your API servers were overwhelmed by sudden traffic surges. Pods were not scaling automatically, and when an administrator initiated a node drain for maintenance, all remaining pods were evicted at once, causing a complete system outage. You must implement automated horizontal pod autoscaling and high-availability eviction protections.',
    problemStatement: 'Static replica counts either waste cloud resources during low traffic or crash under unexpected spikes. Furthermore, maintenance operations (node drains, cluster upgrades) can terminate all replicas simultaneously if PodDisruptionBudgets are missing. An elastic, fault-tolerant scaling architecture is needed.',
    projectObjective: [
      'Deploy and verify the Kubernetes Metrics Server collecting live CPU and memory metrics',
      'Configure Horizontal Pod Autoscaler (HPA v2) scaling pods between 2 and 10 replicas based on 60% CPU utilization',
      'Deploy a PodDisruptionBudget (PDB) guaranteeing minAvailable: 2 during voluntary node maintenance',
      'Configure Topology Spread Constraints distributing pod replicas evenly across failure zones',
      'Execute a synthetic load test and observe automated scale-out and scale-in behaviors'
    ],
    whatYouNeedToBuild: {
      description: 'An elastic scaling and high-availability architecture dynamically adjusting replica counts under load while guaranteeing availability during disruptions.',
      diagram: `High Traffic Load (Simulated Apache Benchmark / Hey)
                       │
                       ▼
[Metrics Server] ──(CPU > 60%)──> [Horizontal Pod Autoscaler (HPA v2)]
                                             │
                       ┌─────────────────────┴─────────────────────┐
                       ▼ (Scale Out Event: Replicas 2 -> 6)        ▼ (Topology Spread Across Nodes/AZs)
             [Worker Node 1 (AZ-a)]                      [Worker Node 2 (AZ-b)]
             ├── Pod Replica 1                           ├── Pod Replica 2
             ├── Pod Replica 3                           ├── Pod Replica 4
             └── Pod Replica 5                           └── Pod Replica 6
                       │
     [Voluntary Node Drain (kubectl drain node-1)]
                       │
                       ▼
[PodDisruptionBudget: minAvailable = 2] ──> Blocks eviction until replacement pods are Ready!`
    },
    requirements: {
      functional: [
        'HPA must automatically scale pod count from 2 to at least 5 replicas during load testing',
        'When load stops, HPA must automatically scale down after the stabilization window',
        'Executing kubectl drain on a node must NOT drop availability below minAvailable specified in PDB'
      ],
      technical: [
        'Use apiVersion: autoscaling/v2 for HPA',
        'Use apiVersion: policy/v1 for PodDisruptionBudget',
        'Workload pods must specify CPU requests (mandatory for HPA calculation)'
      ],
      security: [
        'HPA must have maxReplicas cap (e.g. 10) to prevent runaway cloud bill exhaustion'
      ]
    },
    architecture: {
      summary: 'Elastic autoscaling control loop architecture querying metrics-server every 15 seconds, evaluating target utilization algorithms, and dispatching scaling mutations to Deployment controllers.',
      diagram: `cgroups Metrics ──> kubelet ──> Metrics Server ──> HPA Controller (15s Loop) ──> Deployment Scale API`,
      components: [
        { name: 'Metrics Server', role: 'In-memory metrics aggregator scraping CPU/memory metrics from all cluster kubelets', technologies: ['metrics-server'] },
        { name: 'HPA Controller', role: 'Kubernetes control loop calculating desired replicas: ceil(current * (currentMetric / targetMetric))', technologies: ['autoscaling/v2'] },
        { name: 'PodDisruptionBudget (PDB)', role: 'Safety constraint preventing voluntary operations from violating minimum availability SLAs', technologies: ['policy/v1'] },
        { name: 'Topology Spread Engine', role: 'Scheduler plugin placing pods across failure-domain zones (topologyKey: topology.kubernetes.io/zone)', technologies: ['K8s Scheduler'] }
      ]
    },
    technologyRequirements: {
      required: ['Kubernetes cluster 1.28+', 'Metrics Server installed', 'kubectl CLI', 'Load generator (hey or busybox)'],
      optional: ['KEDA (Kubernetes Event-driven Autoscaling) alternative'],
      outOfScope: ['Cloud Provider proprietary Cluster Autoscaler cloud API integrations']
    },
    functionalRequirements: [
      'Install/enable Metrics Server and verify with kubectl top nodes and kubectl top pods',
      'Deploy application with cpu: requests: 100m, limits: 200m and 2 initial replicas',
      'Create hpa.yaml with minReplicas: 2, maxReplicas: 8, and averageUtilization: 50',
      'Create pdb.yaml with minAvailable: 2 targeting app: web',
      'Launch load generation pod sending 1,000 requests/second to the service',
      'Observe HPA scaling: watch kubectl get hpa,pods (replicas increase to 4, 6, 8)',
      'Stop load test and observe HPA scale-down stabilization window behavior',
      'Simulate node maintenance: run kubectl drain on one node and observe PDB preventing outage'
    ],
    technicalRequirements: [
      'Document HPA mathematical scaling calculation',
      'Verify Topology Spread Constraints: kubectl get pods -o wide (confirm distribution across nodes)'
    ],
    securityRequirements: [
      'Ensure HPA scaling limits prevent resource exhaustion of the cluster'
    ],
    constraints: [
      'Do not configure HPA without setting CPU requests on the target container (HPA will fail to calculate percentage)',
      'Do not set PDB minAvailable equal to 100% of replicas (which would prevent any node drain forever)'
    ],
    expectedOutcome: 'An elastic, self-scaling Kubernetes platform capable of dynamic traffic burst handling and resilient against node maintenance disruptions.',
    deliverables: [
      'HPA v2 manifest (hpa.yaml)',
      'PodDisruptionBudget manifest (pdb.yaml)',
      'Deployment manifest with Topology Spread Constraints (deployment.yaml)',
      'AUTOSCALING_BENCHMARK_REPORT.md detailing load generation metrics, scaling timelines, and PDB eviction logs'
    ],
    suggestedProjectStructure: `k8s-autoscaling/
├── deployment.yaml
├── service.yaml
├── hpa.yaml
├── pdb.yaml
├── load-generator.yaml
└── AUTOSCALING_BENCHMARK_REPORT.md`,
    requiredConcepts: [
      { name: 'Horizontal Pod Autoscaler (HPA)', lessonId: 'c-horizontal-pod-autoscaler', academyRoute: '/kubernetes' },
      { name: 'Autoscaling Fundamentals', lessonId: 'c-why-autoscaling', academyRoute: '/kubernetes' },
      { name: 'Pod Priorities & Disruption', lessonId: 'c-pod-evictions-graceful', academyRoute: '/kubernetes' },
      { name: 'Topology Spread Constraints', lessonId: 'c-topology-spread-constraints', academyRoute: '/kubernetes' }
    ],
    resources: {
      academyLessons: [
        { title: 'Chapter 04: Horizontal Pod Autoscaling (HPA)', route: '/cloudstack/kubernetes?concept=c-horizontal-pod-autoscaler' },
        { title: 'Chapter 04: Pod Evictions & Disruptions', route: '/cloudstack/kubernetes?concept=c-pod-evictions-graceful' },
        { title: 'Chapter 04: Topology Spread Constraints', route: '/cloudstack/kubernetes?concept=c-topology-spread-constraints' }
      ],
      officialDocs: [
        { title: 'HorizontalPodAutoscaler Walkthrough', url: 'https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale-walkthrough/' },
        { title: 'Specifying a Disruption Budget for your Application', url: 'https://kubernetes.io/docs/tasks/run-application/configure-pdb/' }
      ],
      referenceMaterial: ['Kubernetes in Action (Marko Luksa)'],
      usefulCommands: [
        'kubectl top nodes',
        'kubectl top pods',
        'kubectl get hpa -w',
        'kubectl describe hpa <name>',
        'kubectl drain <node> --ignore-daemonsets'
      ]
    },
    recommendedApproach: [
      '1. Verify Metrics Server is installed and collecting data (kubectl top nodes).',
      '2. Author deployment.yaml ensuring container has cpu.requests: 100m.',
      '3. Add topologySpreadConstraints distributing pods across kubernetes.io/hostname.',
      '4. Author hpa.yaml using autoscaling/v2 targeting 50% CPU utilization.',
      '5. Author pdb.yaml setting minAvailable: 2.',
      '6. Apply all manifests and verify initial state (2 replicas, HPA reading 0% CPU).',
      '7. Launch load generation pod generating high HTTP query volume.',
      '8. Monitor HPA scaling replicas up to 4, 6, 8.',
      '9. Terminate load generator; observe scale-down cooldown window (default 5 minutes).',
      '10. Document scaling timeline in AUTOSCALING_BENCHMARK_REPORT.md.'
    ],
    importantConsiderations: [
      'Why is configuring CPU requests mandatory for the Horizontal Pod Autoscaler to function?',
      'How does the scale-down stabilization window (behavior.scaleDown.stabilizationWindowSeconds) prevent thrashing (flapping)?',
      'What happens if a PodDisruptionBudget specifies minAvailable: 3 when only 2 replicas exist?'
    ],
    commonPitfalls: [
      'Omitting container CPU requests, causing HPA status to show <unknown>/50% and fail to scale.',
      'Configuring overly aggressive scale-down windows that terminate pods too quickly during brief traffic dips.',
      'Setting PDB minAvailable equal to total replica count, causing cluster node drains and upgrades to hang indefinitely.'
    ],
    optionalEnhancements: {
      beginner: ['Configure HPA scaling based on memory utilization instead of CPU.'],
      intermediate: ['Configure custom scale-up and scale-down rate policies in HPA behavior block.'],
      advanced: ['Deploy KEDA to scale pods based on RabbitMQ queue depth or Redis list length.'],
      expert: ['Implement Vertical Pod Autoscaler (VPA) in recommendation mode to fine-tune resource requests.']
    },
    completionChecklist: [
      'Metrics Server operational and reporting via kubectl top',
      'Application deployed with explicit CPU requests and topology spread constraints',
      'HPA v2 manifest created targeting 50% CPU',
      'PodDisruptionBudget created with minAvailable: 2',
      'Load generation test triggers automated scale-out to multiple replicas',
      'Cool-down period observed safely scaling down',
      'PDB verified preventing simultaneous pod eviction during simulated node drain',
      'AUTOSCALING_BENCHMARK_REPORT.md published'
    ]
  },
  {
    id: 'k8s-08',
    code: 'K8S-08',
    title: 'Kubernetes Cluster Security & RBAC Governance',
    academy: 'kubernetes',
    difficulty: 'Expert',
    estimatedTime: '14-18 hours',
    technologies: ['Role-Based Access Control (RBAC)', 'Roles & ClusterRoles', 'ServiceAccounts', 'Admission Controllers', 'Audit Logging'],
    overview: 'Design, enforce, and audit an enterprise multi-tenant security architecture in Kubernetes using Role-Based Access Control (RBAC), ServiceAccounts, API token scoping, and admission controller governance.',
    tags: ['kubernetes', 'security', 'rbac', 'clusterroles', 'serviceaccounts', 'governance', 'audit-logging'],
    projectOverview: {
      projectName: 'Kubernetes Cluster Security & RBAC Governance',
      academy: 'kubernetes',
      difficulty: 'Expert',
      estimatedEffort: '14-18 hours',
      technologies: ['RBAC (Roles / RoleBindings)', 'ClusterRoles', 'ServiceAccounts', 'kube-apiserver Audit Logging'],
      shortDescription: 'Construct an enterprise RBAC security governance matrix enforcing least-privilege permissions for developers, CI/CD pipelines, and internal pods.'
    },
    scenario: 'Your security audit revealed that developers and CI/CD pipelines are sharing the cluster-admin credentials, allowing anyone to delete critical namespaces or modify system components in kube-system. Furthermore, microservice pods are running with the default ServiceAccount which had excessive permissions. You must implement a strict Role-Based Access Control (RBAC) governance framework.',
    problemStatement: 'Unrestricted cluster-admin permissions violate SOC 2, HIPAA, and PCI-DSS compliance standards. Inadvertent or malicious commands can destroy the entire cluster. Strict Role-Based Access Control (RBAC) is required to restrict users and service accounts to only the namespaces and verbs they legitimately need.',
    projectObjective: [
      'Design an enterprise RBAC matrix defining Developer, Read-Only Auditor, and CI/CD Deployer personas',
      'Implement granular Roles, ClusterRoles, RoleBindings, and ClusterRoleBindings',
      'Create dedicated ServiceAccounts for workloads and disable automountServiceAccountToken where unneeded',
      'Test permission enforcement using kubectl auth can-i commands',
      'Enable and inspect Kubernetes API server audit logs (/var/log/kubernetes/audit.log)'
    ],
    whatYouNeedToBuild: {
      description: 'An enterprise RBAC governance framework enforcing least-privilege authorization across human developers and automated service accounts.',
      diagram: `User / ServiceAccount Context
                 │
                 ▼
[Kubernetes API Authorization Engine (RBAC)]
├── Persona: developer-alice (Namespace: dev)
│   ├── Role: developer-role (verbs: get, list, watch, create, update on pods, services)
│   └── CANNOT access kube-system or read Secrets!
│
├── Persona: ci-cd-deployer (Namespace: staging)
│   ├── Role: deployer-role (verbs: patch, update on deployments)
│   └── CANNOT delete namespaces!
│
└── Persona: security-auditor (Cluster-Wide)
    ├── ClusterRole: read-only-auditor (verbs: get, list on all resources)
    └── CANNOT modify or create any resource!
                 │
                 ▼
[Audit Logging Engine] ──> Records every API invocation with User, Resource, and Decision`
    },
    requirements: {
      functional: [
        'Developer role must be able to view and manage pods in their team namespace, but completely blocked from other namespaces',
        'Developer role must be blocked from reading Secrets unless explicitly authorized',
        'Auditor role must have cluster-wide read-only access without write permissions',
        'kubectl auth can-i must accurately reflect all defined boundaries'
      ],
      technical: [
        'Use apiVersion: rbac.authorization.k8s.io/v1 for all RBAC objects',
        'Generate X.509 client certificates or ServiceAccount tokens for simulated testing',
        'Use kubectl auth can-i --as=<user> to verify permissions'
      ],
      security: [
        'Disable automountServiceAccountToken: false on pods that do not interact with the Kubernetes API',
        'Zero wildcards ("*") permitted in production Role definitions'
      ]
    },
    architecture: {
      summary: 'API security architecture intercepting every incoming kube-apiserver request through Authentication, RBAC Authorization, and Admission Control filters.',
      diagram: `Request ──> Authentication (TLS Cert / Token) ──> Authorization (RBAC Evaluation) ──> Admission Webhook ──> etcd`,
      components: [
        { name: 'Role & RoleBinding', role: 'Namespaced permission set granting specific verbs (get, list, create) on specific API groups', technologies: ['rbac.authorization.k8s.io'] },
        { name: 'ClusterRole & Binding', role: 'Cluster-scoped permission set granting access across all namespaces and cluster resources (nodes, PVs)', technologies: ['ClusterRole'] },
        { name: 'ServiceAccount', role: 'Identity representation for in-cluster processes interacting with the API server', technologies: ['v1/ServiceAccount'] },
        { name: 'API Audit Logger', role: 'Security logging engine recording JSON records of every API interaction', technologies: ['kube-apiserver Audit'] }
      ]
    },
    technologyRequirements: {
      required: ['Kubernetes cluster 1.28+', 'kubectl CLI', 'OpenSSL for generating test user certificates'],
      optional: ['audit2rbac tool for generating roles from audit logs'],
      outOfScope: ['Full Okta SAML OIDC identity federation configuration']
    },
    functionalRequirements: [
      'Create namespaces: team-frontend and team-backend',
      'Create ServiceAccount developer-alice in team-frontend',
      'Author Role frontend-dev-role allowing pods, services, deployments in team-frontend',
      'Author RoleBinding binding developer-alice to frontend-dev-role',
      'Test with kubectl auth can-i create pods -n team-frontend --as=system:serviceaccount:team-frontend:developer-alice (returns yes)',
      'Test isolation: kubectl auth can-i create pods -n team-backend --as=system:serviceaccount:team-frontend:developer-alice (returns no)',
      'Test secret block: kubectl auth can-i get secrets -n team-frontend --as=... (returns no)',
      'Author ClusterRole cluster-auditor granting read-only access to all resources; bind to auditor user'
    ],
    technicalRequirements: [
      'Verify pod automountServiceAccountToken: false prevents token creation at /var/run/secrets/kubernetes.io/serviceaccount',
      'Inspect API audit log policy file (audit-policy.yaml)'
    ],
    securityRequirements: [
      'Strictly avoid granting cluster-admin or "escalate" permissions',
      'Ensure service account tokens expire or use projected volume tokens'
    ],
    constraints: [
      'Do not use wildcards in verbs (verbs: ["*"] is prohibited)',
      'Do not use wildcards in apiGroups'
    ],
    expectedOutcome: 'A comprehensive, certified Kubernetes RBAC governance framework enforcing least privilege across developer personas, service accounts, and cluster administrators.',
    deliverables: [
      'RBAC manifests (roles.yaml, rolebindings.yaml, clusterroles.yaml)',
      'ServiceAccount specifications (serviceaccounts.yaml)',
      'Audit policy definition (audit-policy.yaml)',
      'RBAC_SECURITY_GOVERNANCE_SPEC.md detailing permission matrices, persona definitions, and can-i verification outputs'
    ],
    suggestedProjectStructure: `k8s-rbac/
├── namespaces.yaml
├── serviceaccounts.yaml
├── roles/
│   ├── dev-role.yaml
│   ├── deployer-role.yaml
│   └── auditor-clusterrole.yaml
├── bindings/
│   ├── dev-binding.yaml
│   └── auditor-binding.yaml
├── audit/
│   └── audit-policy.yaml
└── RBAC_SECURITY_GOVERNANCE_SPEC.md`,
    requiredConcepts: [
      { name: 'RBAC Authorization & Governance', lessonId: 'c-rbac-authorization', academyRoute: '/kubernetes' },
      { name: 'Security Fundamentals in K8s', lessonId: 'c-k8s-security-fundamentals', academyRoute: '/kubernetes' },
      { name: 'Pod Security & Hardening', lessonId: 'c-container-security-hardening', academyRoute: '/kubernetes' },
      { name: 'Cluster Operations & Administration', lessonId: 'c-cluster-operations-admin', academyRoute: '/kubernetes' }
    ],
    resources: {
      academyLessons: [
        { title: 'Chapter 03: RBAC Authorization & Governance', route: '/cloudstack/kubernetes?concept=c-rbac-authorization' },
        { title: 'Chapter 03: Kubernetes Security Fundamentals', route: '/cloudstack/kubernetes?concept=c-k8s-security-fundamentals' },
        { title: 'Chapter 05: Cluster Operations & Administration', route: '/cloudstack/kubernetes?concept=c-cluster-operations-admin' }
      ],
      officialDocs: [
        { title: 'Using RBAC Authorization', url: 'https://kubernetes.io/docs/reference/access-authn-authz/rbac/' },
        { title: 'Kubernetes Auditing', url: 'https://kubernetes.io/docs/tasks/debug/debug-cluster/audit/' }
      ],
      referenceMaterial: ['NSA/CISA Kubernetes Hardening Guidance'],
      usefulCommands: [
        'kubectl auth can-i create deployments --namespace dev',
        'kubectl auth can-i get pods --as developer-alice -n team-frontend',
        'kubectl get rolebindings,clusterrolebindings -A',
        'kubectl describe role <name> -n <namespace>'
      ]
    },
    recommendedApproach: [
      '1. Map out organizational personas (Developer, Deployer, Security Auditor).',
      '2. Define required API groups, resources, and verbs for each persona.',
      '3. Create team namespaces and corresponding ServiceAccounts.',
      '4. Author namespaced Roles with granular permissions in roles/dev-role.yaml.',
      '5. Author RoleBindings linking ServiceAccounts to Roles.',
      '6. Author cluster-scoped ClusterRole for read-only security auditors.',
      '7. Execute comprehensive testing matrix using kubectl auth can-i --as=....',
      '8. Deploy a test pod with automountServiceAccountToken: false and verify token directory is empty.',
      '9. Author audit-policy.yaml defining metadata and request-level auditing.',
      '10. Compile complete compliance report in RBAC_SECURITY_GOVERNANCE_SPEC.md.'
    ],
    importantConsiderations: [
      'What is the difference between a RoleBinding and a ClusterRoleBinding when referencing a ClusterRole?',
      'Why is automountServiceAccountToken: true by default, and why should it be disabled on non-API pods?',
      'How does the "escalate" verb allow a malicious user with partial permissions to grant themselves cluster-admin?'
    ],
    commonPitfalls: [
      'Granting access to "secrets" when a developer only needs "configmaps", risking database credential exposure.',
      'Using ClusterRoleBinding instead of RoleBinding with a ClusterRole, inadvertently granting cluster-wide access instead of namespace-scoped access.',
      'Using wildcards ("*") in verbs or resources, violating compliance audits.'
    ],
    optionalEnhancements: {
      beginner: ['Generate an RBAC visualization map using the rbac-lookup CLI utility.'],
      intermediate: ['Configure custom X.509 client certificates with OpenSSL and test user authentication in kubeconfig.'],
      advanced: ['Implement policy-as-code admission control with Kyverno to reject pods without non-root ServiceAccounts.'],
      expert: ['Set up automated API server audit log streaming to a centralized Elasticsearch or Loki instance.']
    },
    completionChecklist: [
      'Multi-tenant team namespaces created',
      'Dedicated ServiceAccounts configured for all personas',
      'Granular Roles and RoleBindings authored with zero wildcards',
      'ClusterRole authored providing read-only auditing',
      'kubectl auth can-i verifies all boundary enforcement rules',
      'automountServiceAccountToken: false verified inside running pod',
      'Audit policy authored adhering to compliance standards',
      'RBAC_SECURITY_GOVERNANCE_SPEC.md published'
    ]
  },
  {
    id: 'k8s-09',
    code: 'K8S-09',
    title: 'Production Kubernetes Platform & GitOps Continuous Delivery',
    academy: 'kubernetes',
    difficulty: 'Expert / Production',
    estimatedTime: '16-20 hours',
    technologies: ['GitOps (Argo CD)', 'Helm Charts', 'Kustomize Overlays', 'Canary Rollouts (Argo Rollouts)', 'Multi-Environment Clusters'],
    overview: 'Architect and deploy an enterprise GitOps continuous delivery platform on Kubernetes using Argo CD, packaging microservices into reusable Helm charts, managing multi-environment overlays with Kustomize, and executing automated canary progressive rollouts.',
    tags: ['kubernetes', 'gitops', 'argo-cd', 'helm', 'kustomize', 'canary', 'progressive-delivery'],
    projectOverview: {
      projectName: 'Production Kubernetes Platform & GitOps Continuous Delivery',
      academy: 'kubernetes',
      difficulty: 'Expert / Production',
      estimatedEffort: '16-20 hours',
      technologies: ['Argo CD', 'Helm 3', 'Kustomize', 'Argo Rollouts', 'Canary Traffic Shifting'],
      shortDescription: 'Build an enterprise GitOps delivery platform using Argo CD, parameterized Helm charts, Kustomize environment overlays, and automated canary progressive delivery.'
    },
    scenario: 'Your organization deploys 20 microservices across staging and production Kubernetes clusters. Currently, engineers deploy by manually running "helm upgrade" and "kubectl apply" from their laptops, causing drift between what is in Git and what is running on the cluster. You must implement a declarative GitOps continuous delivery engine using Argo CD and progressive canary rollouts.',
    problemStatement: 'Manual cluster mutations bypass audit logs, create configuration drift, and lack self-healing. Furthermore, traditional all-at-once rolling updates expose 100% of users to new bugs. GitOps continuous delivery with automated canary analysis is required.',
    projectObjective: [
      'Deploy and configure Argo CD inside the Kubernetes cluster with declarative Application manifests',
      'Package an application into a production-grade Helm chart with values.yaml parameterization',
      'Structure environment overlays (staging and production) using Kustomize',
      'Deploy Argo Rollouts and execute an automated Canary rollout with progressive traffic shifting (20% -> 50% -> 100%)',
      'Demonstrate GitOps self-healing: manually alter cluster state and observe Argo CD automatically reconciling it'
    ],
    whatYouNeedToBuild: {
      description: 'An enterprise GitOps delivery platform continuously reconciling cluster state against a Git repository with progressive canary rollout capabilities.',
      diagram: `GitOps Manifest Repository (Git as Single Source of Truth)
├── Helm Chart: /charts/api-service
└── Environments: /overlays/staging & /overlays/production
                 │
                 ▼ (Continuous Pull & Reconcile Loop)
[Argo CD Controller (Namespace: argocd)]
├── Watches Git Repo (Auto-Sync & Self-Healing Enabled)
└── Reconciles Desired State to Cluster
                 │
                 ▼
[Production Kubernetes Cluster]
├── Ingress Controller ──(Argo Rollouts Canary Shifting)──┐
│                                                         │
▼                                                         ▼
[Canary Pod (v2.0: 20% Traffic)]           [Stable Pods (v1.0: 80% Traffic)]
└── Verified Healthy via Metrics! ──> Promotes to 100% Stable Rollout`
    },
    requirements: {
      functional: [
        'Pushing a commit to the GitOps repository must automatically trigger Argo CD synchronization within 60 seconds',
        'Manual mutations in the cluster (e.g. deleting a deployment) must be detected and reverted by Argo CD self-healing',
        'Argo Rollouts must shift 20% traffic to canary pods, pause for verification, and automatically promote'
      ],
      technical: [
        'Package application using Helm 3 with templates for deployment, service, ingress, and hpa',
        'Define Argo CD Application CRD (argoproj.io/v1alpha1)',
        'Configure Argo Rollouts with canary strategy (setWeight: 20, pause: {duration: 30s})'
      ],
      security: [
        'Configure Argo CD RBAC restricting anonymous access and enforcing read-only for auditors',
        'Store cluster repository credentials securely using Kubernetes Secrets'
      ]
    },
    architecture: {
      summary: 'Declarative GitOps reconciliation architecture decoupling developer commit lifecycles from in-cluster operator synchronization and progressive traffic controllers.',
      diagram: `Git Manifests ──(Pull)──> Argo CD Engine ──(Sync)──> Kubernetes API ──> Argo Rollouts Controller (Canary Traffic)`,
      components: [
        { name: 'Argo CD Engine', role: 'Declarative GitOps operator reconciling live cluster state against Git definitions', technologies: ['Argo CD', 'CRD'] },
        { name: 'Helm Package Manager', role: 'Templating engine parameterizing Kubernetes manifests across diverse environments', technologies: ['Helm 3'] },
        { name: 'Kustomize Engine', role: 'Template-free customization tool layering environment-specific patch overlays', technologies: ['Kustomize'] },
        { name: 'Argo Rollouts Controller', role: 'Progressive delivery controller managing blue/green and canary traffic weight shifting', technologies: ['Argo Rollouts'] }
      ]
    },
    technologyRequirements: {
      required: ['Kubernetes cluster 1.28+', 'kubectl CLI', 'Helm 3 CLI', 'Argo CD installation'],
      optional: ['Argo Rollouts kubectl plugin'],
      outOfScope: ['Full multi-region cluster federation']
    },
    functionalRequirements: [
      'Install Argo CD into namespace argocd: kubectl create namespace argocd && kubectl apply -n argocd -f ...',
      'Package microservice into Helm chart: my-app/ with templates/ and values.yaml',
      'Create GitOps application manifest application.yaml targeting the repository',
      'Apply application.yaml; observe Argo CD discovering and provisioning all resources in the cluster',
      'Test self-healing: delete a deployment manually with kubectl delete; observe Argo CD recreate it within 30 seconds',
      'Convert Deployment to Rollout object with canary strategy',
      'Trigger canary update: update image tag in Git; observe 20% canary split, pause phase, and successful promotion'
    ],
    technicalRequirements: [
      'Verify Argo CD sync status: Healthy and Synced',
      'Monitor canary progression: kubectl argo rollouts get rollout <name> --watch'
    ],
    securityRequirements: [
      'Ensure Argo CD server runs with TLS enabled and admin password updated'
    ],
    constraints: [
      'Do not perform manual kubectl apply commands on GitOps-managed resources (all changes must originate in Git)',
      'Do not disable Argo CD self-healing in production environments'
    ],
    expectedOutcome: 'A world-class, automated GitOps continuous delivery platform delivering zero-drift cluster synchronization, self-healing, and automated canary progressive rollouts.',
    deliverables: [
      'Helm chart package (charts/my-app/)',
      'Kustomize environment overlays (overlays/staging/ and overlays/production/)',
      'Argo CD Application manifest (application.yaml)',
      'Argo Rollouts canary specification (rollout.yaml)',
      'GITOPS_DELIVERY_SPECIFICATION.md detailing GitOps repository architecture, sync policies, and canary promotion logs'
    ],
    suggestedProjectStructure: `gitops-platform/
├── charts/
│   └── my-app/
│       ├── Chart.yaml
│       ├── values.yaml
│       └── templates/
│           ├── rollout.yaml
│           └── service.yaml
├── overlays/
│   ├── staging/
│   └── production/
├── argocd/
│   └── application.yaml
└── GITOPS_DELIVERY_SPECIFICATION.md`,
    requiredConcepts: [
      { name: 'GitOps Workflow & Argo CD', lessonId: 'c-gitops-workflow', academyRoute: '/kubernetes' },
      { name: 'Helm Charts & Packaging', lessonId: 'c-helm-charts-packaging', academyRoute: '/kubernetes' },
      { name: 'Canary & Blue-Green Deployments', lessonId: 'c-canary-deployments', academyRoute: '/kubernetes' },
      { name: 'Cluster Operations & Administration', lessonId: 'c-cluster-operations-admin', academyRoute: '/kubernetes' }
    ],
    resources: {
      academyLessons: [
        { title: 'Chapter 05: GitOps Workflows & Argo CD', route: '/cloudstack/kubernetes?concept=c-gitops-workflow' },
        { title: 'Chapter 05: Helm Charts Packaging', route: '/cloudstack/kubernetes?concept=c-helm-charts-packaging' },
        { title: 'Chapter 05: Canary Deployments & Traffic Shifting', route: '/cloudstack/kubernetes?concept=c-canary-deployments' }
      ],
      officialDocs: [
        { title: 'Argo CD - Getting Started', url: 'https://argo-cd.readthedocs.io/en/stable/getting_started/' },
        { title: 'Argo Rollouts Architecture', url: 'https://argoproj.github.io/argo-rollouts/architecture/' },
        { title: 'Helm Documentation', url: 'https://helm.sh/docs/' }
      ],
      referenceMaterial: ['GitOps and Kubernetes (Billy Yuen et al.)'],
      usefulCommands: [
        'kubectl apply -n argocd -f argocd/application.yaml',
        'argocd app list',
        'argocd app sync my-app',
        'kubectl argo rollouts get rollout my-app --watch',
        'kubectl argo rollouts promote my-app'
      ]
    },
    recommendedApproach: [
      '1. Install Argo CD into the cluster and retrieve the initial administrative password.',
      '2. Author a standardized Helm chart (charts/my-app/) parameterizing image, replicas, and probes.',
      '3. Structure Kustomize overlays for staging and production.',
      '4. Author the Argo CD Application manifest targeting the Git repository with auto-sync and self-healing.',
      '5. Apply the Application manifest and verify that Argo CD synchronizes all resources into the cluster.',
      '6. Test self-healing by deleting a pod or service with kubectl; observe Argo CD restoring it.',
      '7. Install Argo Rollouts controller and refactor the deployment into an Argo Rollout with canary strategy.',
      '8. Push a new image tag to Git and observe the canary progression (20% weight, pause, promotion).',
      '9. Test automated rollback during canary failure.',
      '10. Publish GITOPS_DELIVERY_SPECIFICATION.md.'
    ],
    importantConsiderations: [
      'Why is pull-based GitOps (in-cluster operator) architecturally more secure than push-based CI deployment scripts?',
      'How does Argo CD detect out-of-band cluster drift and trigger automated self-healing reconciliation?',
      'What are the advantages of canary rollouts with analysis metrics over traditional Kubernetes rolling updates?'
    ],
    commonPitfalls: [
      'Staging and Production targeting the same Git branch without directory overlays, leading to accidental simultaneous production releases.',
      'Failing to enable self-healing (selfHeal: true) in Argo CD syncPolicy, leaving out-of-band drift unresolved.',
      'Attempting to edit manifests manually via kubectl edit on a GitOps-managed cluster (changes get instantly overwritten by Argo CD).'
    ],
    optionalEnhancements: {
      beginner: ['Configure Slack notifications for Argo CD sync events using argo-cd-notifications.'],
      intermediate: ['Integrate Prometheus Metric Analysis into Argo Rollouts to automatically abort canaries on HTTP 500 spikes.'],
      advanced: ['Implement SealedSecrets or External Secrets Operator to manage GitOps-encrypted secrets in Git.'],
      expert: ['Set up multi-cluster GitOps managing deployments across separate staging and production Kubernetes clusters.']
    },
    completionChecklist: [
      'Argo CD installed and running in the cluster',
      'Application packaged into reusable Helm chart',
      'Kustomize environment overlays structured for staging and production',
      'Argo CD Application manifest configured with auto-sync and self-healing',
      'Self-healing verified restoring deleted resources',
      'Argo Rollouts canary deployment executed with 20% traffic split and promotion',
      'Zero manual kubectl apply operations required for deployment',
      'GITOPS_DELIVERY_SPECIFICATION.md published'
    ]
  },
  {
    id: 'k8s-10',
    code: 'K8S-10',
    title: 'Enterprise Kubernetes Production Platform & Disaster Recovery',
    academy: 'kubernetes',
    difficulty: 'Production Grade',
    estimatedTime: '16-24 hours',
    technologies: ['Production Kubernetes Architecture', 'Velero Cluster Backup', 'etcd Snapshot & Recovery', 'Disaster Recovery Drill', 'Multi-Zone High Availability'],
    overview: 'The pinnacle Kubernetes engineering project: architect, harden, backup, and operate an enterprise mission-critical Kubernetes production platform, featuring control plane high availability, automated etcd snapshots, Velero state and volume backup pipelines, and a simulated total cluster loss disaster recovery drill.',
    tags: ['kubernetes', 'production-grade', 'enterprise', 'etcd-backup', 'velero', 'disaster-recovery', 'high-availability'],
    projectOverview: {
      projectName: 'Enterprise Kubernetes Production Platform & Disaster Recovery',
      academy: 'kubernetes',
      difficulty: 'Production Grade',
      estimatedEffort: '16-24 hours',
      technologies: ['etcd Backup & Restore', 'Velero Backup Engine', 'Control Plane HA', 'Disaster Recovery Drill'],
      shortDescription: 'The master Kubernetes capstone: engineer an enterprise multi-tier production Kubernetes platform capable of surviving catastrophic cluster failures through automated etcd snapshots and Velero disaster recovery.'
    },
    scenario: 'You are the Principal Kubernetes Platform Architect for a global banking consortium. The platform runs thousands of financial transaction microservices. Regulatory mandates (SOC 2, ISO 27001) require guaranteed business continuity: if an entire Kubernetes cluster or control plane is destroyed, the platform must be fully restored from encrypted backups with a Recovery Time Objective (RTO) under 15 minutes and Recovery Point Objective (RPO) under 5 minutes. You must build, harden, and validate the disaster recovery architecture.',
    problemStatement: 'Kubernetes control plane failures, corrupted etcd databases, or accidental mass namespace deletions can obliterate production clusters in seconds. Without validated etcd snapshots and application persistent volume backup pipelines (Velero), disaster recovery is impossible.',
    projectObjective: [
      'Architect an enterprise multi-tier Kubernetes production platform (Ingress, Microservices, Cache, Replicated Database)',
      'Automate etcd point-in-time snapshot creation and verification using etcdctl',
      'Deploy and configure VMware Velero for cluster-wide manifest and persistent volume snapshot backups',
      'Schedule automated periodic backups to an S3-compatible object storage repository',
      'Execute a live simulated catastrophic disaster drill: wipe all namespaces and volumes, then execute full disaster recovery in < 15 minutes'
    ],
    whatYouNeedToBuild: {
      description: 'An enterprise Kubernetes production platform backed by automated etcd snapshots, Velero volume backups, and a validated disaster recovery pipeline.',
      diagram: `[Enterprise Kubernetes Production Platform]
├── Ingress Tier: Ingress-Nginx (TLS Termination)
├── Microservice Workloads (Scaled Deployments with PDB & HPA)
├── Persistent Database Tier (StatefulSet with PVCs)
└── Security Boundary (RBAC, PSS Restricted, NetworkPolicies)
                 │
                 ▼
[Automated Backup & Disaster Recovery Architecture]
├── 1. etcd Snapshot Engine: etcdctl snapshot save /backups/etcd-snapshot.db (Every hour)
├── 2. Velero Backup Controller (Namespace: velero)
│      ├── Backs up all Kubernetes API manifests (Deployments, Secrets, PVCs)
│      ├── Takes CSI Volume Snapshots of Persistent Volumes
│      └── Encrypts & Ships Archives to S3 Object Storage
                 │
                 ▼ (CATASTROPHIC DISASTER SIMULATED: TOTAL CLUSTER WIPE)
[Disaster Recovery Execution: velero restore create --from-backup ...]
├── Reconstructs all namespaces, RBAC rules, secrets, and configurations
├── Re-attaches persistent volume storage snapshots
└── Platform 100% Restored with Zero Data Loss in < 15 Minutes!`
    },
    requirements: {
      functional: [
        'Complete platform (applications, configurations, secrets, persistent volumes) must be backed up automatically',
        'During simulated disaster, executing the Velero restore command must recover all workloads and database records',
        'Total recovery time (RTO) must be verified under 15 minutes with zero database transaction loss'
      ],
      technical: [
        'Use etcdctl snapshot save and etcdctl snapshot status',
        'Install Velero with S3/MinIO backup storage location',
        'Configure scheduled backup: velero schedule create daily-backup --schedule="0 1 * * *"'
      ],
      security: [
        'All backup snapshots stored in S3 must be encrypted using AES-256 or KMS',
        'Velero credentials stored in sealed/restricted Kubernetes Secrets'
      ]
    },
    architecture: {
      summary: 'Comprehensive enterprise Kubernetes resilience architecture uniting distributed control plane consensus, volume snapshot abstractions, and off-cluster object archive synchronization.',
      diagram: `etcd Cluster ──(etcdctl)──> Encrypted Snapshot <── Velero Controller ──(CSI Snapshot)──> S3 Storage Bucket`,
      components: [
        { name: 'etcd Distributed Consensus Store', role: 'Immutable key-value database storing all cluster state and metadata', technologies: ['etcd v3', 'Raft'] },
        { name: 'Velero Backup Controller', role: 'In-cluster operator capturing API resources and orchestrating volume snapshot plugins', technologies: ['Velero'] },
        { name: 'CSI Snapshotter', role: 'Container Storage Interface plugin freezing and snapshotting persistent block volumes', technologies: ['VolumeSnapshot CRD'] },
        { name: 'Off-Cluster S3 Repository', role: 'Durable, cross-region object storage bucket hosting encrypted disaster recovery archives', technologies: ['AWS S3 / MinIO'] }
      ]
    },
    technologyRequirements: {
      required: ['Kubernetes cluster 1.28+', 'kubectl CLI', 'Velero CLI', 'MinIO or AWS S3 bucket for backup storage'],
      optional: ['etcdctl CLI on control plane node'],
      outOfScope: ['Bare-metal server physical motherboard swapping']
    },
    functionalRequirements: [
      'Deploy multi-tier production stack: Ingress, API Deployment, PostgreSQL StatefulSet with populated records',
      'Execute etcdctl snapshot save snapshot.db and verify snapshot integrity with etcdctl snapshot status',
      'Install Velero into the cluster connected to S3/MinIO bucket',
      'Execute full cluster backup: velero backup create prod-backup-01 --include-namespaces production,database',
      'Verify backup completes with Status: Completed',
      'SIMULATE DISASTER: delete namespaces production and database: kubectl delete ns production database',
      'Verify application and database are completely gone (HTTP 404 / connection refused)',
      'Execute restore: velero restore create --from-backup prod-backup-01',
      'Monitor restore: observe namespaces, pods, and PVCs recreated and returning to Running state',
      'Connect to restored database and verify 100% of rows are intact; measure recovery time'
    ],
    technicalRequirements: [
      'Document end-to-end RTO and RPO metrics in disaster recovery drill log',
      'Confirm Velero backup includes all Secrets and ConfigMaps'
    ],
    securityRequirements: [
      'Ensure backup object storage bucket enforces encryption-at-rest and object lock/versioning'
    ],
    constraints: [
      'Do not store disaster recovery backups on the same cluster or node being protected',
      'Disaster recovery drill must be verified on live pods and data, not theoretical YAML inspection'
    ],
    expectedOutcome: 'A mission-critical enterprise Kubernetes production platform capable of surviving total cluster destruction and recovering state with verified RTO < 15 minutes.',
    deliverables: [
      'Multi-tier production platform manifests (ingress, app, stateful database)',
      'Velero deployment configuration and backup schedules',
      'etcd backup automation script (etcd-backup.sh)',
      'ENTERPRISE_K8S_PLATFORM_SPECIFICATION.md detailing platform architecture, hardening, and HA topology',
      'KUBERNETES_DISASTER_RECOVERY_POSTMORTEM.md recording the live disaster drill, recovery timeline, and RTO/RPO verification'
    ],
    suggestedProjectStructure: `k8s-enterprise-platform/
├── production-stack/
│   ├── namespace.yaml
│   ├── ingress.yaml
│   ├── backend-deployment.yaml
│   └── database-statefulset.yaml
├── backup-dr/
│   ├── velero-install.sh
│   ├── backup-schedule.yaml
│   └── etcd-backup.sh
├── ENTERPRISE_K8S_PLATFORM_SPECIFICATION.md
└── KUBERNETES_DISASTER_RECOVERY_POSTMORTEM.md`,
    requiredConcepts: [
      { name: 'Cluster Operations & Administration', lessonId: 'c-cluster-operations-admin', academyRoute: '/kubernetes' },
      { name: 'Control Plane Management & etcd', lessonId: 'c-control-plane-management', academyRoute: '/kubernetes' },
      { name: 'Persistent Storage & StatefulSets', lessonId: 'c-persistent-storage-pv-pvc', academyRoute: '/kubernetes' },
      { name: 'Multi-Cluster & DR Management', lessonId: 'c-multicluster-management', academyRoute: '/kubernetes' },
      { name: 'Kubernetes Security Fundamentals', lessonId: 'c-k8s-security-fundamentals', academyRoute: '/kubernetes' }
    ],
    resources: {
      academyLessons: [
        { title: 'Chapter 05: Cluster Operations & Administration', route: '/cloudstack/kubernetes?concept=c-cluster-operations-admin' },
        { title: 'Chapter 05: Control Plane Management & etcd', route: '/cloudstack/kubernetes?concept=c-control-plane-management' },
        { title: 'Chapter 05: Multi-Cluster & Disaster Recovery', route: '/cloudstack/kubernetes?concept=c-multicluster-management' }
      ],
      officialDocs: [
        { title: 'Velero Documentation', url: 'https://velero.io/docs/' },
        { title: 'Operating etcd clusters for Kubernetes', url: 'https://kubernetes.io/docs/tasks/administer-cluster/configure-upgrade-etcd/' }
      ],
      referenceMaterial: ['Production Kubernetes: Managing Cloud-Native Systems (O\'Reilly)'],
      usefulCommands: [
        'ETCDCTL_API=3 etcdctl snapshot save snapshot.db',
        'velero backup create <name> --include-namespaces <ns>',
        'velero backup describe <name>',
        'velero restore create --from-backup <name>',
        'velero restore get'
      ]
    },
    recommendedApproach: [
      '1. Review enterprise SLA requirements, compliance targets, and RTO/RPO limits.',
      '2. Deploy the full production stack: Ingress, API deployment, and PostgreSQL StatefulSet.',
      '3. Seed the database with critical customer records.',
      '4. Connect to control plane node and execute an etcd snapshot using etcdctl.',
      '5. Install Velero CLI and deploy the Velero operator connected to an S3/MinIO bucket.',
      '6. Create a full Velero backup of the production namespaces and persistent volumes.',
      '7. Verify backup archive status is Completed using velero backup describe.',
      '8. Simulate catastrophic failure: execute kubectl delete namespace production database.',
      '9. Initiate disaster recovery: execute velero restore create --from-backup.',
      '10. Monitor pod and volume restoration; verify 100% database recovery in < 15 min; author postmortem.'
    ],
    importantConsiderations: [
      'Why is backing up raw etcd snapshots alone insufficient for applications with cloud-attached PersistentVolumes (EBS/GPD)?',
      'How does Velero coordinate VolumeSnapshot CRDs with cloud storage providers during backup execution?',
      'What are the critical steps to verify database consistency before executing a volume snapshot?'
    ],
    commonPitfalls: [
      'Storing Velero backup archives in a bucket in the same cloud region as the cluster, losing backups during a regional outage.',
      'Failing to test Velero restores regularly, only to discover missing permissions or incompatible storage classes during a real incident.',
      'Restoring an etcd snapshot with mismatched cluster certificates or IP addresses.'
    ],
    optionalEnhancements: {
      beginner: ['Configure Velero automated backup expiration (TTL: 720h) to manage storage costs.'],
      intermediate: ['Configure cross-namespace restore (e.g. restore production backup into a staging namespace).'],
      advanced: ['Deploy Kube-Prometheus-Stack to monitor Velero backup failure metrics.'],
      expert: ['Execute an active-passive multi-cluster disaster recovery drill restoring state into a secondary Kubernetes cluster.']
    },
    completionChecklist: [
      'Multi-tier production platform deployed and operational',
      'Database seeded with verified customer records',
      'etcd point-in-time snapshot created and verified with etcdctl',
      'Velero operator deployed and connected to S3 object storage',
      'Full cluster backup executed with status Completed',
      'Catastrophic disaster simulated (production namespaces completely wiped)',
      'Velero restore executed and verified recovering all pods and PVCs',
      'Database verified 100% intact with zero data loss',
      'RTO < 15 minutes achieved and documented',
      'ENTERPRISE_K8S_PLATFORM_SPECIFICATION.md and KUBERNETES_DISASTER_RECOVERY_POSTMORTEM.md published'
    ]
  }
];

const allK8sCapstones = [...kubernetesCapstones, ...remainingK8sCapstones];

// Add legacy fields for backward compatibility
const enrichedCapstones = allK8sCapstones.map((cap) => {
  return {
    ...cap,
    objectives: cap.projectObjective,
    startingState: {
      description: `Kubernetes production cluster environment for ${cap.title}`,
      environment: 'Kubernetes 1.28+ Cluster (Minikube / Kind / Cloud k8s / kubectl)',
      startingFiles: {
        'deployment.yaml': `# ${cap.title}\napiVersion: apps/v1\nkind: Deployment\nmetadata:\n  name: app\n`,
        'service.yaml': 'apiVersion: v1\nkind: Service\nmetadata:\n  name: app-svc\n'
      }
    },
    tasks: cap.functionalRequirements.map((req, idx) => ({
      id: `task-${idx + 1}`,
      title: req,
      objective: req,
      commandSnippet: cap.resources.usefulCommands[idx % cap.resources.usefulCommands.length] || 'kubectl get pods',
      expectedOutput: 'Action completed successfully.',
      verificationCriteria: req
    })),
    failureScenarios: [
      {
        id: 'fail-1',
        title: cap.commonPitfalls[0] || 'Pod crash loop or scheduling failure',
        symptom: 'Pod enters CrashLoopBackOff or remains in Pending state.',
        rootCause: 'Failed probe, OOM killed, or insufficient node resources.',
        diagnosticCommand: 'kubectl describe pod <pod_name>',
        fixCommand: 'kubectl logs <pod_name> --previous',
        verification: 'Pod reaches Running (1/1 Ready) state.'
      },
      {
        id: 'fail-2',
        title: cap.commonPitfalls[1] || 'Service routing or selector mismatch',
        symptom: 'Service returns connection refused or empty endpoints list.',
        rootCause: 'Label selector mismatch between Service and Pod template.',
        diagnosticCommand: 'kubectl get endpoints <service_name>',
        fixCommand: 'kubectl apply -f service.yaml',
        verification: 'Endpoints list contains active pod IPs.'
      }
    ],
    validationChecks: cap.completionChecklist.map((check, idx) => ({
      id: `val-${idx + 1}`,
      label: check,
      verificationCommand: 'kubectl get pods,svc',
      points: Math.round(100 / cap.completionChecklist.length)
    })),
    scoreMax: 100
  };
});

const outPath = path.join(__dirname, '../data/kubernetesCapstones.ts');
const fileContent = `import { CapstoneProject } from '../types';\n\nexport const KUBERNETES_CAPSTONES: CapstoneProject[] = ${JSON.stringify(enrichedCapstones, null, 2)};\n`;

fs.writeFileSync(outPath, fileContent, 'utf-8');
console.log(`Successfully generated 10 Kubernetes Capstones at ${outPath}`);
