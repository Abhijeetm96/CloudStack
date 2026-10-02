import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, CornerDownLeft, Trash2, HelpCircle } from 'lucide-react';
import { incrementSimulatorInteraction } from '../../progress/terraformProgress';

interface OutputEntry {
  type: 'input' | 'output' | 'error' | 'success';
  text: string;
}

export const TerraformTerminal: React.FC = () => {
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<OutputEntry[]>([
    { type: 'output', text: 'CloudStack Terraform CLI Environment v1.8.0 [Linux x86_64]' },
    { type: 'output', text: 'Type "terraform -help" or "terraform plan" to begin.' }
  ]);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = inputVal.trim();
    if (!cmd) return;

    incrementSimulatorInteraction();
    setInputVal('');

    const newEntries: OutputEntry[] = [{ type: 'input', text: `$ ${cmd}` }];

    const lower = cmd.toLowerCase();

    if (lower === 'clear') {
      setHistory([]);
      return;
    }

    if (lower === 'terraform -help' || lower === 'terraform --help' || lower === 'terraform help') {
      newEntries.push({
        type: 'output',
        text: `Usage: terraform [-version] [-help] <subcommand> [args]

Main commands:
  init          Prepare your working directory for other commands
  validate      Check whether the configuration is valid
  plan          Show changes required by the current configuration
  apply         Create or update infrastructure
  destroy       Destroy previously-created infrastructure

Other commands:
  fmt           Reformat your configuration in the standard style
  state         Advanced state management
  output        Show output values from your root module
  console       Try Terraform expressions at an interactive command prompt`
      });
    } else if (lower.startsWith('terraform init')) {
      newEntries.push({
        type: 'output',
        text: `Initializing the backend...
Successfully configured the backend "s3"! Terraform will automatically
use this backend unless the backend configuration changes.

Initializing provider plugins...
- Finding hashicorp/aws versions matching "~> 5.30.0"...
- Installing hashicorp/aws v5.30.0...
- Installed hashicorp/aws v5.30.0 (signed by HashiCorp)

Terraform has created a lock file .terraform.lock.hcl to record the provider
selections it made above. Include this file in your version control repository.

Terraform has been successfully initialized!`
      });
    } else if (lower.startsWith('terraform fmt')) {
      newEntries.push({
        type: 'success',
        text: `main.tf\nvariables.tf\noutputs.tf\nFormatted 3 files.`
      });
    } else if (lower.startsWith('terraform validate')) {
      newEntries.push({
        type: 'success',
        text: `Success! The configuration is valid.`
      });
    } else if (lower.startsWith('terraform plan')) {
      newEntries.push({
        type: 'output',
        text: `Terraform used the selected providers to generate the following execution plan.
Resource actions are indicated with the following symbols:
  + create

Terraform will perform the following actions:

  # aws_vpc.main will be created
  + resource "aws_vpc" "main" {
      + arn                                  = (known after apply)
      + cidr_block                           = "10.0.0.0/16"
      + enable_dns_hostnames                 = true
      + enable_dns_support                   = true
      + id                                   = (known after apply)
      + tags                                 = {
          + "Environment" = "production"
          + "ManagedBy"   = "terraform"
        }
    }

Plan: 1 to add, 0 to change, 0 to destroy.`
      });
    } else if (lower.startsWith('terraform apply')) {
      newEntries.push({
        type: 'output',
        text: `aws_vpc.main: Creating...
aws_vpc.main: Creation complete after 3s [id=vpc-0123456789abcdef0]

Apply complete! Resources: 1 added, 0 changed, 0 destroyed.

Outputs:
vpc_id = "vpc-0123456789abcdef0"`
      });
    } else if (lower.startsWith('terraform destroy')) {
      newEntries.push({
        type: 'output',
        text: `aws_vpc.main: Destroying... [id=vpc-0123456789abcdef0]
aws_vpc.main: Destruction complete after 2s

Destroy complete! Resources: 1 destroyed.`
      });
    } else if (lower.startsWith('terraform state list')) {
      newEntries.push({
        type: 'output',
        text: `aws_vpc.main\naws_subnet.public_a\naws_security_group.web\naws_instance.app`
      });
    } else if (lower.startsWith('terraform output')) {
      newEntries.push({
        type: 'output',
        text: `vpc_id = "vpc-0123456789abcdef0"\npublic_ip = "54.210.82.15"`
      });
    } else {
      newEntries.push({
        type: 'error',
        text: `Command not recognized: "${cmd}". Type "terraform -help" for available commands.`
      });
    }

    setHistory((prev) => [...prev, ...newEntries]);
  };

  return (
    <div
      style={{
        background: '#030712',
        border: '1px solid rgba(132, 79, 186, 0.3)',
        borderRadius: '12px',
        padding: '1.25rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem',
        color: '#e2e8f0',
        fontFamily: 'ui-monospace, monospace'
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
          <TerminalIcon size={16} color="#34d399" />
          <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#f8fafc' }}>
            Interactive Terraform CLI Console
          </span>
        </div>
        <button
          onClick={() => setHistory([])}
          style={{
            background: 'transparent',
            border: 'none',
            color: '#64748b',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.25rem',
            fontSize: '0.75rem'
          }}
        >
          <Trash2 size={13} />
          Clear
        </button>
      </div>

      {/* Terminal History Container */}
      <div
        style={{
          background: '#090d16',
          borderRadius: '6px',
          border: '1px solid rgba(255, 255, 255, 0.06)',
          padding: '0.85rem',
          height: '240px',
          overflowY: 'auto',
          fontSize: '0.75rem',
          lineHeight: 1.5,
          display: 'flex',
          flexDirection: 'column',
          gap: '0.35rem'
        }}
      >
        {history.map((h, i) => (
          <div
            key={i}
            style={{
              color: h.type === 'input'
                ? '#38bdf8'
                : h.type === 'error'
                ? '#f87171'
                : h.type === 'success'
                ? '#34d399'
                : '#cbd5e1',
              whiteSpace: 'pre-wrap'
            }}
          >
            {h.text}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Command Input Form */}
      <form onSubmit={handleCommand} style={{ display: 'flex', gap: '0.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', color: '#38bdf8', fontSize: '0.8rem', fontWeight: 700 }}>
          $
        </div>
        <input
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          placeholder="terraform plan / terraform apply / terraform init..."
          style={{
            flex: 1,
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '6px',
            color: '#f8fafc',
            padding: '0.45rem 0.75rem',
            fontSize: '0.8rem',
            fontFamily: 'ui-monospace, monospace',
            outline: 'none'
          }}
        />
        <button
          type="submit"
          style={{
            background: 'linear-gradient(135deg, #844fba, #6366f1)',
            border: 'none',
            color: '#fff',
            padding: '0.45rem 0.85rem',
            borderRadius: '6px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.3rem',
            fontSize: '0.75rem',
            fontWeight: 600
          }}
        >
          <CornerDownLeft size={13} />
          Run
        </button>
      </form>
    </div>
  );
};
