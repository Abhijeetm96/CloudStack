import { LinuxTopic } from '../unifiedLinuxData';
import { buildLinuxConcept } from '../conceptFactory';

// ============================================================================
// CHAPTER 14: STORAGE & FILESYSTEM ADMINISTRATION (14.1 to 14.19)
// Deep Senior Engineer Curriculum Implementation
// ============================================================================
export const CHAPTER_14: LinuxTopic = {
  id: 'ch-14',
  number: '14',
  title: 'Storage & Filesystem Administration',
  iconName: 'HardDrive',
  description: 'Master enterprise Linux storage: block devices, partition tables (MBR/GPT), mkfs, mounting, /etc/fstab UUIDs, df/du monitoring, inode triage, LVM (PV/VG/LV), and swap.',
  concepts: [
    buildLinuxConcept({
      id: 'c-14-01',
      subChapterNumber: '14.1',
      command: 'lsblk -f',
      title: 'Block Devices & Storage Architecture',
      topicId: 'ch-14',
      topicNumber: '14',
      topicTitle: 'Storage & Filesystem Administration',
      subtitle: 'Understanding raw block devices, naming schemes (sd*, nvme*, vd*), and storage layering',
      badges: ['Storage', 'Block Devices', 'Architecture'],
      difficulty: 'Beginner',
      quote: 'Linux abstracts physical hard drives, NVMe chips, and virtual disks as block devices in /dev: structured chunks of bytes ready for filesystems.',
      whatIsIt: 'In Linux, storage hardware is accessed via Block Devices located under the /dev directory. Unlike character devices (which stream bytes one by one, like a keyboard), block devices transfer data in fixed-size blocks (typically 512 bytes or 4096 bytes) and support random access. Common naming conventions reflect the underlying controller: /dev/sd* for SATA/SCSI drives, /dev/nvme* for ultra-fast PCIe NVMe SSDs, and /dev/vd* for virtual disks in KVM/QEMU cloud VMs.',
      inSimpleWords: 'A block device is Linux\'s name for a hard drive or SSD. Before you can save files or photos, Linux needs to see the raw drive plugged into the motherboard.',
      whyDoYouNeedIt: 'Storage administration is fundamental to system engineering. Before creating partitions, formatting filesystems, or expanding database storage, an SRE must identify what physical or virtual disks are attached to the kernel.',
      realWorldScenario: 'You attach a new 1 TB EBS volume to an AWS EC2 instance. You need to know if the kernel registered it as /dev/nvme1n1 or /dev/xvdf. Running "lsblk -f" displays the complete block tree, filesystems, and mountpoints in a clear visual tree.',
      realWorldAnalogy: 'A raw plot of vacant land before architects divide it into parcels (partitions), lay out roads (filesystems), and assign street addresses (mountpoints).',
      withoutVsWith: {
        without: {
          title: 'Guessing Block Devices',
          items: ['Risking data loss by writing to the wrong disk identifier (/dev/sda instead of /dev/sdb)', 'Confusion over virtual disk naming across cloud providers (AWS, GCP, VMware)', 'No clear picture of how partitions map to physical drives'],
          outcome: 'Accidental data overwrites and storage allocation failures.'
        },
        with: {
          title: 'Visualizing with lsblk',
          items: ['Hierarchical tree view of drives, partitions, and LVM logical volumes', 'Instant visibility of filesystem types (ext4, xfs) and active mountpoints', 'Cryptographic UUID display for unambiguous disk identification'],
          outcome: 'Accurate storage mapping and safe, deterministic disk administration.'
        }
      },
      blockDiagram: {
        title: 'Linux Storage Layering Architecture',
        subtitle: 'From physical hardware to user files:',
        nodes: [
          { id: 'hw', label: 'Physical Storage Hardware', simpleDef: 'NVMe, SSD, SATA, SAN LUN', techDef: 'PCIe bus, SATA controller, or Fibre Channel HBA', badge: 'Hardware', color: '#38bdf8' },
          { id: 'dev', label: 'Kernel Block Device (/dev)', simpleDef: 'nvme0n1, sda, vda', techDef: 'Block layer driver exposing struct block_device', badge: 'Block Layer', color: '#10b981' },
          { id: 'part', label: 'Partitions or LVM', simpleDef: 'sda1, nvme0n1p1, vg-data', techDef: 'GPT partition table or LVM device-mapper target', badge: 'Partitioning', color: '#a855f7' },
          { id: 'fs', label: 'Filesystem & Mountpoint', simpleDef: 'ext4 mounted on /var/lib', techDef: 'VFS inode/extents layer mounted on directory tree', badge: 'VFS Mount', color: '#f59e0b' }
        ]
      },
      terms: [
        { term: 'Block Device', simple: 'A hardware device that moves data in fixed blocks and allows random seeking.', technical: 'Special device file in /dev represented by "b" mode bit, supporting buffered I/O.' },
        { term: 'lsblk', simple: 'List Block Devices: shows all disks and partitions in a tree format.', technical: 'Reads sysfs filesystem (/sys/block) and udev db to present storage topology.' }
      ],
      syntaxCode: 'lsblk -f',
      syntaxTokens: [
        { token: 'lsblk', role: 'command', explanation: 'List information about all available block devices' },
        { token: '-f', role: 'option', explanation: 'Output filesystem information: TYPE, FSTYPE, LABEL, UUID, and MOUNTPOINT' }
      ],
      variations: [
        { command: 'lsblk -f', description: 'List block device tree with filesystems, UUIDs, and mount points' },
        { command: 'lsblk -m', description: 'Display block device ownership, permissions, and RAM disk sizes' },
        { command: 'cat /proc/partitions', description: 'View kernel partition table and major/minor device numbers' }
      ],
      expectedOutput: 'NAME        FSTYPE FSVER LABEL UUID                                 FSAVAIL FSUSE% MOUNTPOINTS\nsda                                                                                \n├─sda1      vfat   FAT32       E4B2-1209                             505.8M     1% /boot/efi\n├─sda2      ext4   1.0         3d94966b-4f9e-4c74-8b64-88981f9b3ec4    18.4G    62% /\n└─sda3      swap   1           9a3b2c1d-0000-4444-8888-123456789abc                [SWAP]',
      commonMistakes: [
        { mistake: 'Formatting a raw disk without checking if it contains active partitions', whyWrong: 'Writing a new filesystem directly to /dev/sdb will destroy existing partitions and data.', correctWay: 'Always inspect the device with "lsblk -f" or "fdisk -l /dev/sdb" before formatting.' },
        { mistake: 'Confusing /dev/sda (whole disk) with /dev/sda1 (first partition)', whyWrong: 'Operating on /dev/sda modifies the partition table; operating on /dev/sda1 modifies the filesystem.', correctWay: 'Target partitions (e.g. sda1) when formatting or mounting filesystems.' }
      ],
      safeRecovery: 'If you are unsure of a disk\'s contents, run "file -s /dev/sdb" to detect filesystem signatures safely without mounting.'
    }),

    buildLinuxConcept({
      id: 'c-14-02',
      subChapterNumber: '14.2',
      command: 'parted -l || fdisk -l',
      title: 'Disk Partitioning Concepts (MBR vs GPT)',
      topicId: 'ch-14',
      topicNumber: '14',
      topicTitle: 'Storage & Filesystem Administration',
      subtitle: 'The evolution from legacy 1982 MBR to modern UEFI GPT partitioning standards',
      badges: ['Partitioning', 'GPT', 'MBR'],
      difficulty: 'Intermediate',
      quote: 'MBR capped drives at 2TB and 4 primary partitions. GPT removed the limits: 128 partitions, 18 exabytes, and backup headers.',
      whatIsIt: 'Before storing data, a disk must be partitioned. Two standards exist: Master Boot Record (MBR), created in 1982, stores partition tables in the first 512-byte sector (LBA 0). MBR is limited to a maximum disk size of 2 TiB and at most 4 primary partitions. GUID Partition Table (GPT) is the modern standard used with UEFI firmware. GPT supports disks up to 18 Exabytes, provides at least 128 partitions by default, and maintains a backup header at the end of the disk for redundancy.',
      inSimpleWords: 'MBR is an old 1980s blueprint that cannot handle drives larger than 2 Terabytes. GPT is the modern blueprint that works on massive hard drives and keeps a backup copy in case of corruption.',
      whyDoYouNeedIt: 'Modern NVMe drives and high-capacity storage arrays are 4TB, 8TB, or 16TB. You cannot use MBR on drives larger than 2TB without losing all remaining capacity. GPT is mandatory for modern Linux systems.',
      realWorldScenario: 'A storage engineer plugs an 8 TB SATA disk into a backup server. If partitioned with legacy MBR, 6 TB of disk space will be completely invisible and wasted. Partitioning with GPT unlocks all 8 TB.',
      realWorldAnalogy: 'Upgrading from a paper notebook with only 4 pages (MBR) to a digital binder with unlimited pages and automated cloud backup (GPT).',
      withoutVsWith: {
        without: {
          title: 'Using Legacy MBR on Modern Drives',
          items: ['Hard limit of 2.2 TB; any storage beyond 2.2 TB is unusable', 'Maximum 4 primary partitions (requiring complex extended/logical partition hacks)', 'Single point of failure: if sector 0 is corrupted, the entire partition table is lost'],
          outcome: 'Wasted disk capacity, partition complexity, and zero partition table redundancy.'
        },
        with: {
          title: 'Using Modern GPT Partition Tables',
          items: ['Supports up to 18 Exabytes (18 million Terabytes) per disk', '128 independent primary partitions without extended hacks', 'Primary header at beginning of disk + backup secondary header at end of disk'],
          outcome: 'Full storage utilization, clean partition layout, and self-healing resilience.'
        }
      },
      blockDiagram: {
        title: 'MBR vs GPT Disk Layout',
        subtitle: 'Comparing sector structures on a storage drive:',
        nodes: [
          { id: 'mbr', label: 'MBR (Legacy LBA 0)', simpleDef: 'Single 512-byte boot sector', techDef: '446 bytes boot code + 64 bytes table (4 partitions) + 2 bytes signature', badge: 'Legacy', color: '#ef4444' },
          { id: 'gpt_head', label: 'Primary GPT Header (LBA 1)', simpleDef: 'Partition index & UUIDs', techDef: 'Disk GUID, partition array pointer, and CRC32 checksum', badge: 'Primary', color: '#38bdf8' },
          { id: 'gpt_parts', label: '128 Partition Entries', simpleDef: 'Your storage partitions', techDef: 'Each entry has Type GUID, Unique GUID, Start LBA, End LBA, Name', badge: 'Partitions', color: '#10b981' },
          { id: 'gpt_back', label: 'Backup GPT Header (Last LBA)', simpleDef: 'Safety recovery copy', techDef: 'Duplicate header at end of disk used for automatic corruption repair', badge: 'Redundancy', color: '#a855f7' }
        ]
      },
      terms: [
        { term: 'GPT (GUID Partition Table)', simple: 'Modern disk partitioning standard supporting huge drives and 128 partitions.', technical: 'Part of the UEFI specification replacing legacy BIOS MBR partitioning scheme.' },
        { term: 'LBA (Logical Block Addressing)', simple: 'The system used to number sectors on a disk starting from 0.', technical: 'Scheme allowing disk controllers to address sectors sequentially (LBA 0, 1, 2...).' }
      ],
      syntaxCode: 'parted -l || fdisk -l',
      syntaxTokens: [
        { token: 'parted -l', role: 'command', explanation: 'List partition tables and partition types across all attached drives' },
        { token: '||', role: 'operator', explanation: 'Execute next command if parted is not installed' },
        { token: 'fdisk -l', role: 'command', explanation: 'List partition tables using fdisk utility' }
      ],
      variations: [
        { command: 'sudo parted /dev/sda print', description: 'Print partition table model, size, and Partition Table flag (gpt or msdos)' },
        { command: 'sudo gdisk -l /dev/sda', description: 'Inspect GPT partition structures with GUID partition utility' },
        { command: 'sudo fdisk -l /dev/sda', description: 'Display disk geometry, sector size, and disklabel type' }
      ],
      expectedOutput: 'Model: ATA Samsung SSD 870 (scsi)\nDisk /dev/sda: 1000GB\nSector size (logical/physical): 512B/512B\nPartition Table: gpt\nDisk Flags: \n\nNumber  Start   End     Size    File system  Name  Flags\n 1      1049kB  538MB   537MB   fat32              boot, esp\n 2      538MB   1000GB  999GB   ext4',
      commonMistakes: [
        { mistake: 'Partitioning a 4TB drive with MBR/msdos label', whyWrong: 'MBR 32-bit sector math limits capacity to 2.19 TB; remaining space will be permanently inaccessible.', correctWay: 'Always choose GPT ("g" in fdisk, or "mklabel gpt" in parted).' },
        { mistake: 'Overwriting the GPT backup header when DDing images', whyWrong: 'GPT stores a secondary header in the last 33 sectors; writing smaller images without repair triggers warnings.', correctWay: 'Use "gdisk" or "sgdisk -e" to move the backup header to the true end of the disk.' }
      ],
      safeRecovery: 'If primary GPT is corrupted, use "gdisk" to restore the partition table from the secondary backup header at the end of the drive.'
    }),

    buildLinuxConcept({
      id: 'c-14-03',
      subChapterNumber: '14.3',
      command: 'sudo fdisk -l /dev/sda',
      title: 'Partitioning with fdisk and gdisk',
      topicId: 'ch-14',
      topicNumber: '14',
      topicTitle: 'Storage & Filesystem Administration',
      subtitle: 'Interactive terminal partition table editors: creating, modifying, and saving partition layouts',
      badges: ['fdisk', 'gdisk', 'CLI'],
      difficulty: 'Intermediate',
      quote: 'fdisk and gdisk are the surgical scalpels of disk layout: examine sectors, carve boundaries, and write changes in memory first.',
      whatIsIt: 'fdisk is the classic interactive menu-driven tool for creating and modifying partition tables. Historically MBR-focused, modern fdisk fully supports GPT disklabels. gdisk (GPT fdisk) is specifically designed for GPT disks. Both tools operate entirely in RAM: changes made during an interactive session are NOT written to disk until you explicitly issue the "w" (write) command, providing a safety net against mistakes.',
      inSimpleWords: 'A partition cutter. You launch it, tell it how big you want the partition to be (e.g. +50G), and it does the math. Nothing actually changes on your disk until you press "w" to save.',
      whyDoYouNeedIt: 'When provisioning bare-metal servers, formatting secondary attached volumes, or configuring swap partitions, fdisk or gdisk allows precise sector-level partitioning.',
      realWorldScenario: 'You attached a new 500GB SSD to your web server for user uploads. You launch "sudo fdisk /dev/sdb", create a new GPT label with "g", add a primary partition spanning the full disk with "n", and commit with "w".',
      realWorldAnalogy: 'Drawing pencil lines on a wooden plank before cutting it with a saw: you can erase and redraw as many times as you want until you make the cut.',
      withoutVsWith: {
        without: {
          title: 'Dangerous Blind Partition Editing',
          items: ['Accidentally running destructive non-interactive scripts on the wrong disk', 'Immediate irreversible writes destroying existing filesystems', 'Misaligned partition boundaries reducing SSD I/O performance'],
          outcome: 'Data loss and suboptimal SSD read/write speeds.'
        },
        with: {
          title: 'Interactive fdisk/gdisk Workflow',
          items: ['Safe in-memory editing with "q" (quit without saving) fallback', 'Automatic 1MiB (2048 sector) partition alignment for optimal SSD performance', 'Ability to verify partition layout with "p" before committing writes'],
          outcome: 'Safe, reversible changes and perfectly aligned storage performance.'
        }
      },
      blockDiagram: {
        title: 'fdisk Interactive Workflow',
        subtitle: 'Key single-letter commands in the fdisk interactive menu:',
        nodes: [
          { id: 'p', label: '"p" Print', simpleDef: 'Show current partition table', techDef: 'Displays in-memory partition list and sector ranges', badge: 'Inspect', color: '#38bdf8' },
          { id: 'n', label: '"n" New', simpleDef: 'Create a new partition', techDef: 'Prompts for partition number, first sector, and last sector size (+50G)', badge: 'Create', color: '#10b981' },
          { id: 't', label: '"t" Type', simpleDef: 'Change partition type', techDef: 'Sets partition type GUID (e.g. Linux filesystem, Swap, LVM)', badge: 'Tag', color: '#a855f7' },
          { id: 'w', label: '"w" Write', simpleDef: 'Save changes to disk and exit', techDef: 'Writes partition table to disk and calls ioctl BLKRRPART', badge: 'Commit', color: '#f59e0b' }
        ]
      },
      terms: [
        { term: 'Partition Alignment', simple: 'Starting partitions on sector 2048 (1MiB) so writes align with SSD memory pages.', technical: 'Aligning partition start offsets to physical 4096-byte (4Kn) or flash erase-block boundaries.' },
        { term: 'partprobe', simple: 'A command that tells the Linux kernel to re-read the partition table without rebooting.', technical: 'Invokes BLKRRPART ioctl on block devices to refresh kernel partition structures.' }
      ],
      syntaxCode: 'sudo fdisk -l /dev/sda',
      syntaxTokens: [
        { token: 'sudo', role: 'command', explanation: 'Execute with root administrative privileges' },
        { token: 'fdisk', role: 'command', explanation: 'Fixed disk partition table manipulator' },
        { token: '-l', role: 'option', explanation: 'List partition table entries for specified device' },
        { token: '/dev/sda', role: 'path', explanation: 'Target block device to inspect' }
      ],
      variations: [
        { command: 'sudo fdisk -l /dev/sda', description: 'List partition table of /dev/sda non-interactively' },
        { command: 'sudo fdisk /dev/sdb', description: 'Launch interactive partition editor on /dev/sdb' },
        { command: 'sudo gdisk /dev/sdb', description: 'Launch interactive GPT partition editor on /dev/sdb' },
        { command: 'sudo partprobe /dev/sdb', description: 'Force kernel to re-read partition table without a system reboot' }
      ],
      expectedOutput: 'Disk /dev/sda: 465.76 GiB, 500107862016 bytes, 976773168 sectors\nDisklabel type: gpt\nDisk identifier: 8B123456-789A-BCDE-F012-3456789ABCDE\n\nDevice         Start       End   Sectors   Size Type\n/dev/sda1       2048   1050623   1048576   512M EFI System\n/dev/sda2    1050624 976771071 975720448 465.3G Linux filesystem',
      commonMistakes: [
        { mistake: 'Forgetting to run "w" before exiting fdisk', whyWrong: 'If you type "q" or close your terminal, all partition additions or edits are lost.', correctWay: 'Type "w" to write the partition table to disk before exiting.' },
        { mistake: 'Modifying an active in-use partition and rebooting blindly', whyWrong: 'The kernel cannot re-read partition tables if a partition is mounted, resulting in "device or resource busy".', correctWay: 'Unmount the partition first, make changes, and verify with "partprobe".' }
      ],
      safeRecovery: 'If you make a mistake inside fdisk, type "q" and press Enter to quit immediately without saving any changes.'
    }),

    buildLinuxConcept({
      id: 'c-14-04',
      subChapterNumber: '14.4',
      command: 'sudo parted /dev/sdb print',
      title: 'Partitioning with parted',
      topicId: 'ch-14',
      topicNumber: '14',
      topicTitle: 'Storage & Filesystem Administration',
      subtitle: 'Scriptable partition management: creating, resizing, and scripting partition automation',
      badges: ['parted', 'Scripting', 'Automation'],
      difficulty: 'Intermediate',
      quote: 'Unlike interactive fdisk, parted can run entirely on the command line: perfect for Kickstart, cloud-init, and Ansible automation.',
      whatIsIt: 'GNU parted is a partition manipulation utility capable of handling both MBR and GPT partition tables. While parted features an interactive shell, its greatest strength in enterprise environments is its non-interactive CLI mode. By passing commands as arguments (e.g. parted -s /dev/sdb mklabel gpt mkpart primary ext4 0% 100%), SREs can automate disk provisioning inside bash scripts, cloud-init, and CI/CD pipelines.',
      inSimpleWords: 'parted is an automated partition tool. Instead of asking you questions one by one, you can give it all the instructions in a single command, making it great for automation scripts.',
      whyDoYouNeedIt: 'You are writing an automation script to provision 100 bare-metal Kubernetes worker nodes. You cannot have an interactive human typing "n", "Enter", "w" into fdisk 100 times. Parted automates this in one line.',
      realWorldScenario: 'A cloud-init script boots a new database server. The script executes "parted -s /dev/nvme1n1 mklabel gpt mkpart data xfs 0% 100%" to immediately format and prepare the storage volume before Docker starts.',
      realWorldAnalogy: 'A laser CNC cutting machine programmed with exact code coordinates vs a carpenter holding a manual handsaw.',
      withoutVsWith: {
        without: {
          title: 'Manual Interactive Partitioning',
          items: ['Requires human interactive keystrokes for every disk partition operation', 'Prone to human typing errors during rapid server provisioning', 'Impossible to embed cleanly in unattended infrastructure automation'],
          outcome: 'Slow provisioning and inconsistent partition sizing.'
        },
        with: {
          title: 'Scripted Partitioning with parted',
          items: ['Single-line unattended disk partitioning with parted -s (silent mode)', 'Percentage-based boundaries (0% 100%) automatically calculating full disk usage', 'Seamless integration into Ansible playbooks, Terraform, and cloud-init'],
          outcome: 'Fully automated, idempotent, and error-free disk provisioning.'
        }
      },
      blockDiagram: {
        title: 'parted Automation Pipeline',
        subtitle: 'Single-line non-interactive disk preparation:',
        nodes: [
          { id: 'flag', label: 'parted -s /dev/sdb', simpleDef: 'Run silently without prompts', techDef: 'Executes commands non-interactively without user confirmation', badge: 'CLI Flag', color: '#38bdf8' },
          { id: 'label', label: 'mklabel gpt', simpleDef: 'Create GPT partition table', techDef: 'Writes new GUID Partition Table erasing old headers', badge: 'Disklabel', color: '#10b981' },
          { id: 'part', label: 'mkpart data ext4 0% 100%', simpleDef: 'Create partition across full disk', techDef: 'Aligns and carves partition spanning 0% to 100% of capacity', badge: 'Partition', color: '#a855f7' }
        ]
      },
      terms: [
        { term: 'parted -s', simple: 'Script mode: suppresses prompts and executes commands immediately.', technical: 'Disables interactive mode; fails if user interaction would have been required.' },
        { term: 'Alignment Check', simple: 'Verifies whether a partition boundary matches optimal hardware performance sectors.', technical: 'parted "align-check optimal <num>" checks 1MiB sector alignment.' }
      ],
      syntaxCode: 'sudo parted /dev/sdb print',
      syntaxTokens: [
        { token: 'sudo', role: 'command', explanation: 'Execute with administrative root privileges' },
        { token: 'parted', role: 'command', explanation: 'GNU partition manipulation program' },
        { token: '/dev/sdb', role: 'path', explanation: 'Target block device' },
        { token: 'print', role: 'argument', explanation: 'Display partition table details for specified device' }
      ],
      variations: [
        { command: 'sudo parted /dev/sdb print', description: 'Display disk model, capacity, disklabel, and partition list' },
        { command: 'sudo parted -s /dev/sdb mklabel gpt', description: 'Create a new GPT partition table silently on /dev/sdb' },
        { command: 'sudo parted -s /dev/sdb mkpart primary ext4 0% 100%', description: 'Create single partition using 100% of available space' },
        { command: 'sudo parted /dev/sdb align-check optimal 1', description: 'Verify that partition 1 is aligned optimally for disk hardware' }
      ],
      expectedOutput: 'Model: Virtio Block Device (virtblk)\nDisk /dev/sdb: 107GB\nSector size (logical/physical): 512B/512B\nPartition Table: gpt\nDisk Flags: \n\nNumber  Start   End    Size   File system  Name     Flags\n 1      1049kB  107GB  107GB               primary',
      commonMistakes: [
        { mistake: 'Specifying start at 0MB instead of 0% or 1MiB', whyWrong: 'Starting at 0MB can trigger partition alignment warnings because sector 0 holds partition tables.', correctWay: 'Use "0%" or "1MiB" as the start offset so parted aligns automatically.' },
        { mistake: 'Forgetting that parted writes changes IMMEDIATELY', whyWrong: 'Unlike fdisk, parted does NOT wait for a "w" write command; it modifies the disk the moment you hit Enter.', correctWay: 'Triple-check the target device path before hitting Enter with parted.' }
      ],
      safeRecovery: 'Always run "sudo parted /dev/TARGET print" first to confirm you have the right disk before running mklabel or mkpart.'
    }),

    buildLinuxConcept({
      id: 'c-14-05',
      subChapterNumber: '14.5',
      command: 'sudo mkfs.ext4 -F /dev/sdb1',
      title: 'Creating Filesystems (mkfs.ext4, mkfs.xfs)',
      topicId: 'ch-14',
      topicNumber: '14',
      topicTitle: 'Storage & Filesystem Administration',
      subtitle: 'Formatting block devices: initializing superblock metadata, inode tables, and journaling structures',
      badges: ['mkfs', 'ext4', 'xfs'],
      difficulty: 'Intermediate',
      quote: 'A partition without a filesystem is just a raw grid of sectors. mkfs builds the filing cabinets, drawers, and indexes.',
      whatIsIt: 'Formatting a partition in Linux means laying down a filesystem using the "mkfs" (Make Filesystem) family of commands. mkfs is a frontend wrapper that invokes filesystem-specific formatters such as "mkfs.ext4" or "mkfs.xfs". Formatting writes the superblock (which defines filesystem geometry), sets up the inode allocation table (which stores file metadata), initializes block allocation bitmaps, and reserves space for the write-ahead journal.',
      inSimpleWords: 'Formatting the drive. It draws lines on a blank piece of paper so you can write organized sentences. Without formatting, Linux cannot store named files or folders.',
      whyDoYouNeedIt: 'After creating a new partition or cloud EBS volume, you cannot mount or store data on it until you format it with a filesystem like ext4 or XFS.',
      realWorldScenario: 'You are adding an auxiliary data disk to a database server. After partitioning /dev/sdb1, you format it with "sudo mkfs.xfs -f /dev/sdb1" because XFS excels at high-throughput parallel database I/O.',
      realWorldAnalogy: 'Installing filing cabinets and labeling folders inside an empty warehouse room before receiving inventory.',
      withoutVsWith: {
        without: {
          title: 'Unformatted Raw Block Device',
          items: ['Unable to mount device to any directory tree in Linux', 'Kernel cannot interpret file boundaries, ownership, or timestamps', 'Attempting to mount returns "mount: wrong fs type, bad superblock"'],
          outcome: 'Unusable storage and mount errors.'
        },
        with: {
          title: 'Formatted with Modern Journaled Filesystem',
          items: ['Robust write-ahead journaling preventing filesystem corruption on power loss', 'High-performance extent-based file allocation for fast large-file reads', 'Immediate mountability and full POSIX permissions support'],
          outcome: 'Fast, reliable, and recoverable storage ready for production data.'
        }
      },
      blockDiagram: {
        title: 'mkfs Filesystem Layout',
        subtitle: 'Key data structures initialized during formatting:',
        nodes: [
          { id: 'super', label: 'Superblock', simpleDef: 'Master filesystem index', techDef: 'Stores block size, mount count, total blocks, and UUID', badge: 'Superblock', color: '#38bdf8' },
          { id: 'journal', label: 'Journal (JBD2)', simpleDef: 'Crash recovery ledger', techDef: 'Write-ahead circular log recording metadata transactions', badge: 'Journal', color: '#10b981' },
          { id: 'inodes', label: 'Inode Table', simpleDef: 'Catalog of file metadata', techDef: 'Fixed-size structures storing permissions, owner, timestamps, and pointers', badge: 'Inodes', color: '#a855f7' },
          { id: 'blocks', label: 'Data Blocks', simpleDef: 'Actual file contents', techDef: '4096-byte storage blocks holding user payload data', badge: 'Data Blocks', color: '#f59e0b' }
        ]
      },
      terms: [
        { term: 'Superblock', simple: 'The header of the filesystem containing size, block counts, and status.', technical: 'Critical metadata structure duplicated at sparse block groups for disaster recovery.' },
        { term: 'Journal', simple: 'A log that records intended file changes before they are committed, preventing corruption.', technical: 'Circular write-ahead log enabling fast metadata consistency recovery after crashes.' }
      ],
      syntaxCode: 'sudo mkfs.ext4 -F /dev/sdb1',
      syntaxTokens: [
        { token: 'sudo', role: 'command', explanation: 'Execute with root administrative privileges' },
        { token: 'mkfs.ext4', role: 'command', explanation: 'Create an ext4 journaled Linux filesystem' },
        { token: '-F', role: 'option', explanation: 'Force execution without interactive overwrite confirmation' },
        { token: '/dev/sdb1', role: 'path', explanation: 'Target partition to format' }
      ],
      variations: [
        { command: 'sudo mkfs.ext4 /dev/sdb1', description: 'Format /dev/sdb1 as an ext4 filesystem' },
        { command: 'sudo mkfs.xfs -f /dev/sdb1', description: 'Format /dev/sdb1 as high-performance XFS filesystem' },
        { command: 'sudo tune2fs -L DATA_VOL /dev/sdb1', description: 'Assign a human-readable volume label to an ext4 filesystem' }
      ],
      expectedOutput: 'mke2fs 1.46.5 (30-Dec-2021)\nCreating filesystem with 26214400 4k blocks and 6553600 inodes\nFilesystem UUID: f3b47c8d-6e5a-4b92-8012-3456789abcde\nSuperblock backups stored on blocks:\n\t32768, 98304, 163840, 229376, 294912, 819200, 884736\n\nAllocating group tables: done\nWriting inode tables: done\nCreating journal (131072 blocks): done\nWriting superblocks and filesystem accounting information: done',
      commonMistakes: [
        { mistake: 'Running mkfs on an active, mounted filesystem', whyWrong: 'Formatting a mounted filesystem will corrupt active running processes and crash the kernel.', correctWay: 'Ensure the partition is unmounted ("umount /dev/sdb1") before formatting.' },
        { mistake: 'Formatting /dev/sdb instead of /dev/sdb1 by accident', whyWrong: 'Formatting the raw disk erases the partition table and leaves an unpartitioned "superfloppy".', correctWay: 'Format the specific partition (/dev/sdb1) unless intentionally creating raw whole-disk filesystems.' }
      ],
      safeRecovery: 'If mkfs fails or an ext4 superblock is corrupted, restore from backup superblocks using "fsck.ext4 -b 32768 /dev/sdb1".'
    }),

    buildLinuxConcept({
      id: 'c-14-06',
      subChapterNumber: '14.6',
      command: 'df -T',
      title: 'Filesystem Comparison (ext4 vs XFS vs Btrfs vs ZFS)',
      topicId: 'ch-14',
      topicNumber: '14',
      topicTitle: 'Storage & Filesystem Administration',
      subtitle: 'Architectural trade-offs: general-purpose ext4, enterprise XFS, and next-gen CoW filesystems',
      badges: ['ext4', 'XFS', 'Btrfs', 'ZFS'],
      difficulty: 'Intermediate',
      quote: 'ext4 is the battle-tested standard; XFS is the enterprise high-throughput champion; Btrfs and ZFS bring copy-on-write snapshots.',
      whatIsIt: 'Linux supports a rich ecosystem of filesystems, each optimized for specific workloads. ext4 (Fourth Extended Filesystem) is the reliable general-purpose default for Debian/Ubuntu, featuring online expansion and offline shrinking. XFS is Red Hat\'s default, designed for massive scalability, high parallel I/O, and 64-bit metadata (cannot be shrunk). Btrfs and ZFS are modern Copy-on-Write (CoW) filesystems offering built-in pooling, instantaneous snapshots, transparent compression, and automated bit-rot detection.',
      inSimpleWords: 'Different types of filing cabinets. ext4 is the classic reliable cabinet. XFS is the giant industrial cabinet built for heavy databases. Btrfs and ZFS are high-tech smart cabinets that can take instant snapshots and fix corrupted papers automatically.',
      whyDoYouNeedIt: 'Choosing the right filesystem dictates server reliability and backup speed. Running a high-write PostgreSQL cluster on XFS provides lower metadata contention than ext4; running container storage or backup servers on Btrfs/ZFS enables zero-cost snapshots.',
      realWorldScenario: 'You are architecting an enterprise database cluster on RHEL 9. You select XFS for the transaction logs and tables because its Allocation Groups handle parallel write threads with minimal locking contention.',
      realWorldAnalogy: 'Choosing between a reliable family sedan (ext4), a heavy-duty semi-truck (XFS), and an advanced transformer vehicle with instant cloning (Btrfs/ZFS).',
      withoutVsWith: {
        without: {
          title: 'Blind Filesystem Selection',
          items: ['Using ext4 on massive petabyte arrays and hitting metadata bottleneck limits', 'Selecting XFS and discovering too late that it cannot be shrunk to reclaim SAN space', 'Missing out on instantaneous CoW snapshots for rapid database backups'],
          outcome: 'I/O bottlenecks, storage inflexibility, and complex backup scripts.'
        },
        with: {
          title: 'Strategic Filesystem Selection',
          items: ['ext4 for general-purpose workloads requiring online expansion and shrinking', 'XFS for parallel, high-throughput enterprise database engines and large files', 'Btrfs/ZFS for immutable snapshots, subvolumes, and transparent zstd compression'],
          outcome: 'Maximum I/O throughput, effortless snapshot backups, and optimized storage costs.'
        }
      },
      blockDiagram: {
        title: 'Filesystem Comparison Matrix',
        subtitle: 'Core capabilities and limitations:',
        nodes: [
          { id: 'ext4', label: 'ext4 (Debian/Ubuntu default)', simpleDef: 'Rock-solid & can shrink', techDef: 'Online grow, offline shrink, 16TB max file, max 1EB filesystem', badge: 'Standard', color: '#38bdf8' },
          { id: 'xfs', label: 'XFS (RHEL/Rocky default)', simpleDef: 'Massive parallel speed', techDef: 'Allocation groups for concurrent I/O; can GROW online but CANNOT SHRINK', badge: 'High Perf', color: '#10b981' },
          { id: 'btrfs', label: 'Btrfs (SUSE/Fedora)', simpleDef: 'Copy-on-Write & Snapshots', techDef: 'Built-in RAID, subvolumes, sub-second snapshots, inline zstd compression', badge: 'Next-Gen', color: '#a855f7' },
          { id: 'zfs', label: 'OpenZFS (Enterprise Storage)', simpleDef: 'Storage pools & bit-rot repair', techDef: 'Combined volume manager and filesystem with end-to-end data integrity checksums', badge: 'Enterprise CoW', color: '#f59e0b' }
        ]
      },
      terms: [
        { term: 'Copy-on-Write (CoW)', simple: 'When modifying a file, new data is written to a new block instead of overwriting the original.', technical: 'Never overwrites blocks in-place; updates metadata pointers, enabling zero-cost atomic snapshots.' },
        { term: 'Allocation Group (AG)', simple: 'Independent sections inside an XFS disk that can be written to in parallel.', technical: 'Autonomous filesystem regions with their own free space and inode maps, eliminating global lock contention.' }
      ],
      syntaxCode: 'df -T',
      syntaxTokens: [
        { token: 'df', role: 'command', explanation: 'Report filesystem disk space usage' },
        { token: '-T', role: 'option', explanation: 'Print the filesystem type (ext4, xfs, btrfs, tmpfs) for each mount' }
      ],
      variations: [
        { command: 'df -T -h', description: 'Display disk usage with filesystem type in human-readable units' },
        { command: 'findmnt -t ext4,xfs,btrfs', description: 'List only physical persistent filesystem mountpoints' },
        { command: 'cat /proc/filesystems', description: 'List filesystems currently supported by the running kernel' }
      ],
      expectedOutput: 'Filesystem     Type     Size  Used Avail Use% Mounted on\n/dev/sda2      ext4      50G   14G   34G  30% /\n/dev/sdb1      xfs      100G   20G   80G  20% /data\n/dev/sdc1      btrfs    500G  120G  378G  25% /backups\ntmpfs          tmpfs    3.9G     0  3.9G   0% /run/user/1000',
      commonMistakes: [
        { mistake: 'Trying to shrink an XFS filesystem', whyWrong: 'XFS design does not support shrinking; running "xfs_growfs" can only enlarge storage.', correctWay: 'If you ever need to reduce partition sizes, choose ext4 or plan backup-destroy-recreate cycles for XFS.' },
        { mistake: 'Assuming CoW filesystems (Btrfs) have zero performance penalty for random VM disk writes', whyWrong: 'Copy-on-Write can cause severe fragmentation on large random-write files like qcow2 images.', correctWay: 'Disable CoW (chattr +C) on virtual machine disk directories.' }
      ],
      safeRecovery: 'Always check filesystem support with "cat /proc/filesystems" before formatting partitions.'
    }),

    buildLinuxConcept({
      id: 'c-14-07',
      subChapterNumber: '14.7',
      command: 'sudo mount /dev/sdb1 /mnt/data',
      title: 'Mounting Filesystems (mount)',
      topicId: 'ch-14',
      topicNumber: '14',
      topicTitle: 'Storage & Filesystem Administration',
      subtitle: 'Attaching storage to the single Linux root directory tree with mount options',
      badges: ['Mount', 'VFS', 'Admin'],
      difficulty: 'Beginner',
      quote: 'In Linux there are no C: or D: drive letters: all storage attaches like branches onto the single root directory tree.',
      whatIsIt: 'In Linux, all files and storage devices reside under a single unified directory tree starting at root ("/"). To make a formatted storage partition accessible to users and applications, you must "mount" it to an existing directory called a Mountpoint. The "mount" command binds the filesystem root on a block device to that directory. Any existing files inside the mountpoint directory become temporarily hidden until the device is unmounted.',
      inSimpleWords: 'Plugging in a flash drive and choosing which folder it opens in. Instead of creating a "Drive E:", Linux makes the drive appear inside a folder like /mnt/data.',
      whyDoYouNeedIt: 'Whether attaching a secondary SSD, mounting an NFS network share, or mapping an ISO image, mounting is the universal mechanism to access files in Linux.',
      realWorldScenario: 'You attached a high-speed NVMe drive to store database records. You create the directory "/var/lib/postgresql/data" and mount "/dev/nvme0n1p1" to that exact path so PostgreSQL writes directly to the fast drive.',
      realWorldAnalogy: 'Docking a boat at a pier: once docked at Pier 4 (/mnt/data), anyone walking onto Pier 4 is walking inside the boat.',
      withoutVsWith: {
        without: {
          title: 'Unmounted Storage Devices',
          items: ['Data on formatted disks remains completely unreachable by programs', 'No ability to enforce read-only (ro) or noexec security policies per disk', 'Cluttered systems requiring custom drive-letter logic'],
          outcome: 'Inaccessible storage and inability to apply targeted security controls.'
        },
        with: {
          title: 'Mounting to the Unified VFS Tree',
          items: ['Seamless integration into the global directory hierarchy', 'Granular mount options: noexec (prevent script execution), ro (read-only), nosuid', 'Dynamic mounting of remote network shares (NFS, SMB) and loopback ISOs'],
          outcome: 'Transparent data access and hardened filesystem security boundaries.'
        }
      },
      blockDiagram: {
        title: 'Linux Mount Operation',
        subtitle: 'Attaching a block device to the directory tree:',
        nodes: [
          { id: 'dev', label: 'Partition /dev/sdb1', simpleDef: 'Storage device containing files', techDef: 'Block device with valid superblock', badge: 'Storage', color: '#38bdf8' },
          { id: 'mount', label: 'mount command', simpleDef: 'Binds device to folder', techDef: 'Kernel VFS registers mount structure', badge: 'VFS Link', color: '#10b981' },
          { id: 'dir', label: 'Directory /mnt/data', simpleDef: 'Mountpoint folder', techDef: 'Target directory inode overridden by device root inode', badge: 'Mountpoint', color: '#a855f7' }
        ]
      },
      terms: [
        { term: 'Mountpoint', simple: 'An empty directory on your system where a disk partition is attached.', technical: 'Directory inode whose dentry traversal is redirected by the kernel VFS to the target filesystem root.' },
        { term: 'noexec mount flag', simple: 'A security setting that forbids running executable programs from that partition.', technical: 'Kernel security flag causing sys_execve to return EACCES for binaries on that volume.' }
      ],
      syntaxCode: 'sudo mount /dev/sdb1 /mnt/data',
      syntaxTokens: [
        { token: 'sudo', role: 'command', explanation: 'Execute with root administrative privileges' },
        { token: 'mount', role: 'command', explanation: 'Attach a filesystem to the system directory hierarchy' },
        { token: '/dev/sdb1', role: 'path', explanation: 'Source block device partition' },
        { token: '/mnt/data', role: 'path', explanation: 'Destination mountpoint directory' }
      ],
      variations: [
        { command: 'sudo mount /dev/sdb1 /mnt/data', description: 'Mount /dev/sdb1 to /mnt/data with default options (rw, suid, dev, exec, auto, nouser, async)' },
        { command: 'sudo mount -o ro /dev/sdb1 /mnt/data', description: 'Mount filesystem in strictly read-only mode' },
        { command: 'sudo mount -o remount,rw /mnt/data', description: 'Remount an already mounted filesystem as read-write without unmounting' },
        { command: 'sudo mount -o loop ubuntu.iso /mnt/iso', description: 'Mount an ISO disk image file using a loopback device' }
      ],
      expectedOutput: '(mount executes silently upon success; verify with "findmnt /mnt/data")',
      commonMistakes: [
        { mistake: 'Mounting over a directory that already contains important files', whyWrong: 'The existing files are not deleted, but they become completely invisible until the disk is unmounted.', correctWay: 'Always mount onto an empty directory, or verify directory contents before mounting.' },
        { mistake: 'Assuming a manual "mount" command survives a server reboot', whyWrong: 'Manual "mount" commands are stored in RAM only; upon reboot, the mount is lost.', correctWay: 'Add an entry to /etc/fstab for permanent persistent mounting.' }
      ],
      safeRecovery: 'To verify what is mounted and view active mount flags, run "findmnt /mnt/data".'
    }),

    buildLinuxConcept({
      id: 'c-14-08',
      subChapterNumber: '14.8',
      command: 'sudo umount /mnt/data',
      title: 'Unmounting Filesystems (umount)',
      topicId: 'ch-14',
      topicNumber: '14',
      topicTitle: 'Storage & Filesystem Administration',
      subtitle: 'Safely detaching filesystems, flushing dirty buffers, and handling "target is busy" errors',
      badges: ['umount', 'Storage', 'Troubleshooting'],
      difficulty: 'Beginner',
      quote: 'umount ensures every cached write is flushed from RAM to physical platters or flash before detaching the storage.',
      whatIsIt: 'The "umount" (spelled without the first \'n\') command safely detaches a mounted filesystem from the directory hierarchy. Crucially, umount forces the kernel to flush all pending unwritten data (dirty write buffers in RAM) to the physical storage device. If any process has an open file or working directory inside the mountpoint, umount will refuse with "target is busy". Tools like "fuser" or "lsof" identify the blocking process.',
      inSimpleWords: 'The "Safely Remove Hardware" button for Linux. It makes sure all your files are finished saving to the disk before disconnecting it, so nothing gets corrupted.',
      whyDoYouNeedIt: 'Yanking a USB drive or detaching a cloud volume without unmounting causes data corruption because buffered data in RAM is never committed to storage.',
      realWorldScenario: 'You need to detach a SAN storage LUN from an application server. You run "sudo umount /mnt/san", but it returns "target is busy". You run "fuser -vm /mnt/san" to discover an engineer left a bash shell open in that folder, terminate it, and unmount safely.',
      realWorldAnalogy: 'Telling everyone to exit the bus and checking that all baggage is unloaded before uncoupling the trailer from the vehicle.',
      withoutVsWith: {
        without: {
          title: 'Force Detaching Without umount',
          items: ['Data corruption due to unwritten cache in kernel dirty memory pages', 'Inconsistent filesystem superblock state requiring emergency fsck repair', 'Zombie file handles and kernel crash traces'],
          outcome: 'Permanent data loss and corrupted storage volumes.'
        },
        with: {
          title: 'Clean umount Workflow',
          items: ['Automatic buffer flushing (sync) guaranteeing 100% data integrity on disk', 'Safe process eviction with fuser/lsof troubleshooting', 'Lazy unmount (umount -l) fallback for seamless cleanup of busy network mounts'],
          outcome: 'Zero data loss and clean storage detachment.'
        }
      },
      blockDiagram: {
        title: 'Troubleshooting "Target is Busy"',
        subtitle: 'Diagnosing and resolving unmount blocks:',
        nodes: [
          { id: 'umount_fail', label: 'umount: target is busy', simpleDef: 'Device cannot be unmounted', techDef: 'Kernel VFS detects active dentry reference count > 1', badge: 'Error', color: '#ef4444' },
          { id: 'fuser', label: 'fuser -vm /mnt/data', simpleDef: 'Find who is using the folder', techDef: 'Scans /proc/[pid]/fd and cwd for references', badge: 'Audit', color: '#38bdf8' },
          { id: 'kill', label: 'fuser -km /mnt/data', simpleDef: 'Kill blocking processes', techDef: 'Sends SIGKILL to all processes locking the mount', badge: 'Evict', color: '#f59e0b' },
          { id: 'clean', label: 'sudo umount /mnt/data', simpleDef: 'Successful detachment', techDef: 'Flushes buffers, closes device, frees VFS mount node', badge: 'Success', color: '#10b981' }
        ]
      },
      terms: [
        { term: 'Target is Busy', simple: 'An error meaning a program or user is currently inside that folder or using a file.', technical: 'Refusal to unmount when kernel VFS mount reference counter (mnt_count) is non-zero.' },
        { term: 'Lazy Unmount (umount -l)', simple: 'Detaches the folder from the directory tree immediately, cleaning up references once apps close.', technical: 'Unlinks the mount from the namespace immediately; releases storage once active file descriptors close.' }
      ],
      syntaxCode: 'sudo umount /mnt/data',
      syntaxTokens: [
        { token: 'sudo', role: 'command', explanation: 'Execute with root administrative privileges' },
        { token: 'umount', role: 'command', explanation: 'Unmount file systems (note spelling: no "n" after u)' },
        { token: '/mnt/data', role: 'path', explanation: 'Mountpoint or device path to unmount' }
      ],
      variations: [
        { command: 'sudo umount /mnt/data', description: 'Safely unmount filesystem by mountpoint directory' },
        { command: 'sudo umount /dev/sdb1', description: 'Safely unmount filesystem by source block device path' },
        { command: 'fuser -vm /mnt/data', description: 'List all process IDs and users holding open files on the mount' },
        { command: 'sudo umount -l /mnt/data', description: 'Lazy unmount: detach immediately and clean up references as processes close' }
      ],
      expectedOutput: '(umount executes silently upon success; verify with "findmnt /mnt/data" returning exit code 1)',
      commonMistakes: [
        { mistake: 'Trying to unmount while your current working directory is inside the mount', whyWrong: 'Your own bash shell is holding the directory open, causing "target is busy".', correctWay: 'Run "cd ~" to step out of the directory before running "umount".' },
        { mistake: 'Typing "unmount" with an extra "n"', whyWrong: 'The Linux utility has historically been named "umount" since 1971 Unix.', correctWay: 'Type "umount" without the first "n".' }
      ],
      safeRecovery: 'If an unresponsive NFS server locks up umount, use "sudo umount -f -l /mnt/nfs" to force lazy detachment.'
    }),

    buildLinuxConcept({
      id: 'c-14-09',
      subChapterNumber: '14.9',
      command: 'cat /etc/fstab',
      title: 'Persistent Mounts (/etc/fstab)',
      topicId: 'ch-14',
      topicNumber: '14',
      topicTitle: 'Storage & Filesystem Administration',
      subtitle: 'The filesystem table: configuring automatic mounts on boot with the 6 mandatory columns',
      badges: ['fstab', 'Boot', 'Config'],
      difficulty: 'Intermediate',
      quote: 'fstab is the boot contract: one single syntax error in /etc/fstab can throw an entire production server into emergency recovery mode.',
      whatIsIt: '/etc/fstab (FileSystem TABle) is the configuration file read during boot by systemd-fstab-generator to automatically mount partitions, network shares, and swap spaces. Each line contains exactly six fields separated by whitespace: 1) Device identifier (UUID recommended), 2) Mountpoint, 3) Filesystem type (ext4, xfs), 4) Mount options (defaults, noatime), 5) Dump backup flag (usually 0), and 6) Fsck check order (1 for root /, 2 for others, 0 to skip).',
      inSimpleWords: 'A startup shopping list for Linux. Every time the computer turns on, it reads this file to know which hard drives to plug into which folders automatically.',
      whyDoYouNeedIt: 'Without /etc/fstab, every drive you attach would disappear after a reboot, breaking web servers and databases.',
      realWorldScenario: 'You configure a 2TB SSD for MariaDB databases. You add a UUID-based entry to /etc/fstab with "nofail" so that the server reboots smoothly and mounts database storage automatically.',
      realWorldAnalogy: 'Programming your smart home so the lights, heating, and blinds turn on automatically at 7:00 AM every morning.',
      withoutVsWith: {
        without: {
          title: 'Manual Ad-Hoc Mounting',
          items: ['Secondary drives fail to mount upon server reboots, causing database startup crashes', 'Human intervention required after every scheduled kernel maintenance reboot', 'Inconsistent mount options applied by different engineers'],
          outcome: 'Post-reboot application downtime and manual operational toil.'
        },
        with: {
          title: 'Configured in /etc/fstab',
          items: ['Deterministic, automated filesystem mounting during early systemd boot', 'Optimized performance options (noatime to eliminate unnecessary disk writes)', 'Fail-safe flags (nofail) preventing boot hangs if an external volume is absent'],
          outcome: 'Resilient reboots, optimal I/O performance, and automated infrastructure.'
        }
      },
      blockDiagram: {
        title: '/etc/fstab 6-Column Anatomy',
        subtitle: 'Field breakdown of an /etc/fstab entry:',
        nodes: [
          { id: 'dev', label: '1. Device (UUID=...)', simpleDef: 'Disk identifier', techDef: 'Filesystem UUID from blkid (avoids drive letter drift)', badge: 'Device', color: '#38bdf8' },
          { id: 'mp', label: '2. Mountpoint (/data)', simpleDef: 'Target folder', techDef: 'Directory path where filesystem is anchored', badge: 'Mountpoint', color: '#10b981' },
          { id: 'fs', label: '3. Type (ext4/xfs)', simpleDef: 'Filesystem type', techDef: 'Filesystem driver identifier', badge: 'Type', color: '#a855f7' },
          { id: 'opt', label: '4. Options (defaults)', simpleDef: 'Mount settings', techDef: 'Comma-separated flags: rw, suid, dev, exec, auto, nouser, async', badge: 'Flags', color: '#f59e0b' },
          { id: 'dump', label: '5. Dump (0)', simpleDef: 'Legacy dump utility', techDef: '0 disables dump backup; 1 enables dump', badge: 'Dump', color: '#64748b' },
          { id: 'pass', label: '6. Fsck Pass (2)', simpleDef: 'Boot check order', techDef: '1: Root /, 2: Other local filesystems, 0: Skip fsck', badge: 'Fsck Order', color: '#ec4899' }
        ]
      },
      terms: [
        { term: 'nofail mount option', simple: 'Tells Linux to continue booting normally even if this disk is missing or unplugged.', technical: 'Systemd mount unit does not block default.target if device fails to appear.' },
        { term: 'noatime', simple: 'Stops Linux from writing to the disk just because you read a file, speeding up SSDs.', technical: 'Disables updating inode access timestamps on file reads, dramatically reducing write I/O.' }
      ],
      syntaxCode: 'cat /etc/fstab',
      syntaxTokens: [
        { token: 'cat', role: 'command', explanation: 'Display file contents' },
        { token: '/etc/fstab', role: 'path', explanation: 'Static filesystem table configuration file' }
      ],
      variations: [
        { command: 'cat /etc/fstab', description: 'View current persistent filesystem table entries' },
        { command: 'sudo mount -a', description: 'Mount all filesystems mentioned in /etc/fstab (tests syntax safely!)' },
        { command: 'findmnt --verify', description: 'Validate /etc/fstab syntax and check for missing directories or bad options' }
      ],
      expectedOutput: '# /etc/fstab: static file system information.\nUUID=3d94966b-4f9e-4c74-8b64-88981f9b3ec4 /          ext4    defaults,noatime 0 1\nUUID=E4B2-1209                            /boot/efi  vfat    umask=0077       0 2\nUUID=9a3b2c1d-0000-4444-8888-123456789abc none       swap    sw               0 0\nUUID=f3b47c8d-6e5a-4b92-8012-3456789abcde /data      xfs     defaults,nofail  0 2',
      commonMistakes: [
        { mistake: 'Rebooting after editing /etc/fstab without testing with "sudo mount -a"', whyWrong: 'A single typo will cause systemd to fail boot and drop into emergency mode, requiring console recovery.', correctWay: 'ALWAYS run "sudo mount -a" immediately after editing /etc/fstab; if it outputs errors, fix them before rebooting!' },
        { mistake: 'Using raw device names like /dev/sdb1 instead of UUIDs', whyWrong: 'Kernel drive letters can change after a reboot if drives are plugged into different ports.', correctWay: 'Always use "UUID=..." to identify disks persistently.' }
      ],
      safeRecovery: 'If your server enters emergency mode after a reboot, remount root as read-write with "mount -o remount,rw /", edit /etc/fstab to fix the typo, and reboot.'
    }),

    buildLinuxConcept({
      id: 'c-14-10',
      subChapterNumber: '14.10',
      command: 'blkid',
      title: 'UUIDs and Labeling',
      topicId: 'ch-14',
      topicNumber: '14',
      topicTitle: 'Storage & Filesystem Administration',
      subtitle: 'Universally Unique Identifiers: immutable hardware addressing preventing device letter drift',
      badges: ['UUID', 'blkid', 'Storage'],
      difficulty: 'Beginner',
      quote: 'Drive letters like /dev/sda are fickle; UUIDs are forever. Never write a raw device name in production boot files.',
      whatIsIt: 'A UUID (Universally Unique Identifier) is a 128-bit cryptographic hexadecimal string automatically generated by mkfs and written directly into the filesystem superblock (e.g. 3d94966b-4f9e-4c74-8b64-88981f9b3ec4). Unlike volatile kernel device names (/dev/sda, /dev/sdb) which can shift if SATA cables are swapped or PCIe buses re-enumerate, a UUID stays bound to that specific filesystem regardless of which physical port it is plugged into. The "blkid" command queries block devices and prints their UUID, TYPE, and LABEL.',
      inSimpleWords: 'A UUID is like a passport number for your hard drive. Even if you plug the drive into a different port, Linux recognizes its passport number instantly and mounts it in the right place.',
      whyDoYouNeedIt: 'In cloud environments like AWS EC2, attached EBS volumes can re-order from /dev/xvdf to /dev/xvdg upon reboot. Referencing UUIDs guarantees the operating system mounts the right disk to the right folder every time.',
      realWorldScenario: 'You are adding an auxiliary data volume. You run "sudo blkid /dev/sdb1", copy the exact UUID string, and use "UUID=f3b47c8d-6e5a-4b92-8012-3456789abcde" in /etc/fstab for absolute boot stability.',
      realWorldAnalogy: 'Identifying an employee by their unique national ID number rather than by which desk they happen to be sitting at today.',
      withoutVsWith: {
        without: {
          title: 'Using Volatile /dev/sd* Names',
          items: ['Drive letter changes after kernel updates or cable swaps causing boot failure', 'Bootloader mounts backup disk as root filesystem by mistake', 'Silent data corruption writing to wrong swapped drive'],
          outcome: 'Unpredictable reboots and accidental data destruction.'
        },
        with: {
          title: 'Using Persistent UUIDs and Labels',
          items: ['100% deterministic mounting regardless of hardware bus ordering', 'Easy identification using human-readable labels (LABEL=DATABASE_DATA)', 'Compliance with modern systemd and cloud storage best practices'],
          outcome: 'Bulletproof storage addressing and rock-solid boot reliability.'
        }
      },
      blockDiagram: {
        title: 'Device Drift vs UUID Stability',
        subtitle: 'Why UUIDs prevent catastrophic mount confusion:',
        nodes: [
          { id: 'drift', label: 'Port Swap / Reboot', simpleDef: 'Disks re-enumerate', techDef: 'SATA controller re-detects drives in reverse order', badge: 'Event', color: '#f59e0b' },
          { id: 'sd_bad', label: '/dev/sda becomes /dev/sdb', simpleDef: 'Drive letters swap!', techDef: 'Kernel assigns /dev/sda to secondary disk', badge: 'Danger', color: '#ef4444' },
          { id: 'uuid_good', label: 'UUID Remains Identical', simpleDef: 'UUID stays locked to data', techDef: 'Kernel reads superblock UUID: 3d94966b... matches /', badge: 'Protected', color: '#10b981' }
        ]
      },
      terms: [
        { term: 'UUID', simple: 'A 36-character unique identifier generated when a filesystem is formatted.', technical: '128-bit number formatted in 5 hexadecimal groups (8-4-4-4-12) stored in superblock.' },
        { term: 'blkid', simple: 'A command that prints UUIDs, filesystem types, and labels for all disks.', technical: 'Block ID: utility locating and printing block device attributes using libblkid.' }
      ],
      syntaxCode: 'blkid [options] [device]',
      syntaxTokens: [
        { token: 'blkid', role: 'command', explanation: 'Locate and print block device attributes (UUID, TYPE, LABEL)' },
        { token: '[options]', role: 'flag', explanation: 'Query options such as -s or -o formatting flags' },
        { token: '[device]', role: 'path', explanation: 'Target block device to inspect' }
      ],
      variations: [
        { command: 'sudo blkid', description: 'List UUIDs and filesystem types for all attached block devices' },
        { command: 'sudo blkid /dev/sda1', description: 'Query UUID and details for a specific partition' },
        { command: 'ls -l /dev/disk/by-uuid/', description: 'Inspect persistent UUID symlinks managed by udev' },
        { command: 'sudo e2label /dev/sdb1 DATA_STORE', description: 'Assign an ext4 volume label for human-friendly mounting' }
      ],
      expectedOutput: '/dev/sda1: UUID="E4B2-1209" BLOCK_SIZE="512" TYPE="vfat" PARTUUID="7a123456-01"\n/dev/sda2: UUID="3d94966b-4f9e-4c74-8b64-88981f9b3ec4" BLOCK_SIZE="4096" TYPE="ext4" PARTUUID="7a123456-02"\n/dev/sdb1: UUID="f3b47c8d-6e5a-4b92-8012-3456789abcde" BLOCK_SIZE="4096" TYPE="xfs" PARTUUID="9b654321-01"',
      commonMistakes: [
        { mistake: 'Cloning a disk with dd and keeping duplicate UUIDs on the same machine', whyWrong: 'Having two disks with identical UUIDs confuses the kernel, leading to unpredictable mounting.', correctWay: 'Generate a new UUID on the cloned partition with "tune2fs -U random /dev/sdX1" or "xfs_admin -U generate".' },
        { mistake: 'Running blkid without sudo and getting empty or partial output', whyWrong: 'Unprivileged users cannot read raw block device superblocks on some distributions.', correctWay: 'Always execute "sudo blkid".' }
      ],
      safeRecovery: 'To check which disk is mounted to root by UUID, run "findmnt / -o TARGET,SOURCE,UUID".'
    }),

    buildLinuxConcept({
      id: 'c-14-11',
      subChapterNumber: '14.11',
      command: 'df -h',
      title: 'Disk Space Monitoring (df)',
      topicId: 'ch-14',
      topicNumber: '14',
      topicTitle: 'Storage & Filesystem Administration',
      subtitle: 'Filesystem capacity triage: human-readable metrics, used percentages, and reserve space',
      badges: ['df', 'Monitoring', 'Storage'],
      difficulty: 'Beginner',
      quote: 'df is the first command you type when a server throws an alarm: Disk Free reveals partition capacity in under a second.',
      whatIsIt: '"df" (Disk Free) displays the amount of available and used disk space on all mounted filesystems. Running "df -h" translates raw block numbers into human-readable units (Gigabytes, Megabytes). df reports total size, used space, available space, percentage capacity, and mountpoint. On ext4 filesystems, 5% of space is reserved for root by default, meaning unprivileged users run out of space when df reports 95% full.',
      inSimpleWords: 'The fuel gauge of your hard drives. It shows you how much space is left on each drive so you don\'t run out of room unexpectedly.',
      whyDoYouNeedIt: 'When a database crashes with "no space left on device" or an alert fires from Prometheus, df immediately tells you which specific mountpoint is full.',
      realWorldScenario: 'An automated monitoring alert pings on-call: "Host web-04 disk usage > 90%". You SSH in, run "df -h", and instantly see that "/var" is at 98% capacity while "/" and "/home" have plenty of room.',
      realWorldAnalogy: 'Checking the fuel gauge and tire pressure on your car dashboard before embarking on a long highway road trip.',
      withoutVsWith: {
        without: {
          title: 'Blind to Storage Capacity',
          items: ['Services crashing abruptly when disks hit 100% capacity', 'Database corruption when write-ahead logs cannot append', 'Unaware of which partition is experiencing data growth'],
          outcome: 'Production outages and emergency incident calls.'
        },
        with: {
          title: 'Proactive Monitoring with df',
          items: ['Instant visibility of capacity across all mountpoints in human units (GB/TB)', 'Detection of root reserve space limits preventing system lockouts', 'Automated integration into Prometheus/Datadog monitoring alerts'],
          outcome: 'Early capacity warnings, proactive disk expansion, and zero disk-full outages.'
        }
      },
      blockDiagram: {
        title: 'df Capacity Breakdown',
        subtitle: 'Understanding ext4 root reserved blocks:',
        nodes: [
          { id: 'used', label: 'Used Space (e.g. 70%)', simpleDef: 'Files on disk', techDef: 'Data blocks allocated to active user files', badge: 'Used', color: '#ef4444' },
          { id: 'avail', label: 'Available (e.g. 25%)', simpleDef: 'Free for anyone', techDef: 'Blocks available for unprivileged user writes', badge: 'Free', color: '#10b981' },
          { id: 'res', label: 'Reserved (5% Root Only)', simpleDef: 'Emergency root buffer', techDef: 'Reserved blocks allowing root to log in and clean up even when 100% full', badge: 'Safety Buffer', color: '#f59e0b' }
        ]
      },
      terms: [
        { term: 'df -h', simple: 'Disk Free in Human-readable format (displays GB, MB instead of 1K blocks).', technical: 'Uses powers of 1024 (GiB, MiB) to format VFS statvfs system call output.' },
        { term: 'Reserved Blocks', simple: 'A 5% cushion of disk space reserved for the root user to prevent total system lockout.', technical: 'Configured via tune2fs -m; allows daemons running as root (sshd, syslog) to continue functioning.' }
      ],
      syntaxCode: 'df -h',
      syntaxTokens: [
        { token: 'df', role: 'command', explanation: 'Report filesystem disk space usage' },
        { token: '-h', role: 'option', explanation: 'Print sizes in human-readable powers of 1024 (e.g., 1K 234M 2G)' }
      ],
      variations: [
        { command: 'df -h', description: 'Display disk usage across all filesystems in human-readable units' },
        { command: 'df -h /var', description: 'Show capacity specifically for the filesystem containing /var' },
        { command: 'df -x tmpfs -x devtmpfs', description: 'Exclude temporary RAM disks to view only physical storage' }
      ],
      expectedOutput: 'Filesystem      Size  Used Avail Use% Mounted on\nudev            3.8G     0  3.8G   0% /dev\ntmpfs           784M  1.4M  782M   1% /run\n/dev/sda2        49G   18G   29G  39% /\n/dev/sdb1        98G   89G  4.2G  96% /data\n/dev/sda1       511M  6.1M  505M   2% /boot/efi',
      commonMistakes: [
        { mistake: 'Panicking when tmpfs filesystems show in df output', whyWrong: 'tmpfs mounts are RAM-backed virtual filesystems (/run, /dev/shm) and do not represent physical disk space.', correctWay: 'Use "df -h -x tmpfs -x devtmpfs" to focus exclusively on persistent physical drives.' },
        { mistake: 'Assuming df and du will always report identical numbers', whyWrong: 'If an open file was deleted, du stops counting it, but df still counts its disk blocks until the process closes the file handle.', correctWay: 'Check for deleted open files with "lsof +L1" if df shows high usage but du does not.' }
      ],
      safeRecovery: 'If an ext4 disk hits 100% and unprivileged users cannot write, root can still log in and reclaim space thanks to the 5% reserved block cushion.'
    }),

    buildLinuxConcept({
      id: 'c-14-12',
      subChapterNumber: '14.12',
      command: 'du -sh /var/log/* | sort -hr | head -n 10',
      title: 'Directory Space Usage (du)',
      topicId: 'ch-14',
      topicNumber: '14',
      topicTitle: 'Storage & Filesystem Administration',
      subtitle: 'Hunting down disk hogs: recursive directory size summation and top consumer sorting',
      badges: ['du', 'Disk Hogs', 'Triage'],
      difficulty: 'Beginner',
      quote: 'df tells you WHICH partition is full; du tells you WHICH FOLDER or FILE is consuming all the space.',
      whatIsIt: '"du" (Disk Usage) recursively scans directories to calculate the actual disk space consumed by files and folders. Unlike "df" (which queries filesystem superblocks instantly), "du" walks directory trees and sums inode block allocations. Combining "du -sh" with "sort -hr" is the standard Linux SRE triage pattern for locating runaway log files, bloated database dumps, and forgotten archive tarballs.',
      inSimpleWords: 'The folder scale. It weighs every folder on your drive and tells you which one is the heaviest, so you know exactly what to delete when disk space is low.',
      whyDoYouNeedIt: 'Your /var partition is at 98%. You need to know which specific application or log file is filling up the drive so you can clean it up before production crashes.',
      realWorldScenario: 'An application runaway bug wrote 60 GB of unrotated debug logs into /var/log/app. Running "du -sh /var/log/* | sort -hr | head -n 5" pinpoints the offending 60GB file in 2 seconds.',
      realWorldAnalogy: 'A detective going room to room in a house to weigh the furniture and find which room has accumulated 500 pounds of old junk.',
      withoutVsWith: {
        without: {
          title: 'Blind Guessing What Consumed Space',
          items: ['Randomly opening directories hoping to spot large files', 'Deleting safe configuration files while leaving giant 50GB log files untouched', 'Wasted hours during high-pressure production outages'],
          outcome: 'Prolonged downtime and accidental deletion of critical files.'
        },
        with: {
          title: 'Targeted Triage with du and sort',
          items: ['Instant identification of the top 10 largest folders or files', 'Recursive depth limiting (du -h --max-depth=1) for clean, readable output', 'Accurate identification of runaway log files or uncleaned docker caches'],
          outcome: 'Rapid space reclamation and immediate incident resolution.'
        }
      },
      blockDiagram: {
        title: 'Disk Triage Workflow',
        subtitle: 'From partition alarm to root-cause file deletion:',
        nodes: [
          { id: 'step1', label: '1. df -h', simpleDef: 'Find full partition', techDef: 'Identifies /var at 96% utilization', badge: 'Alert', color: '#ef4444' },
          { id: 'step2', label: '2. du -sh /var/* | sort -hr', simpleDef: 'Find heaviest folder', techDef: 'Pinpoints /var/log consuming 85 GB', badge: 'Locate', color: '#f59e0b' },
          { id: 'step3', label: '3. du -sh /var/log/* | sort -hr', simpleDef: 'Find the giant file', techDef: 'Reveals /var/log/nginx/access.log at 80 GB', badge: 'Identify', color: '#38bdf8' },
          { id: 'step4', label: '4. truncate -s 0 file', simpleDef: 'Safely zero out log', techDef: 'Frees disk space immediately without breaking open file descriptors', badge: 'Resolve', color: '#10b981' }
        ]
      },
      terms: [
        { term: 'du -sh', simple: 'Summary in Human-readable format: prints the total size of each specified target.', technical: '-s summarizes arguments without printing every child file; -h formats in KB/MB/GB.' },
        { term: 'sort -hr', simple: 'Sorts output in Human-readable numeric order in Reverse (largest first).', technical: 'Parses K, M, G suffixes and sorts descending so the biggest hogs appear at the top.' }
      ],
      syntaxCode: 'du -sh /var/log/* | sort -hr | head -n 10',
      syntaxTokens: [
        { token: 'du', role: 'command', explanation: 'Estimate file space usage' },
        { token: '-sh', role: 'option', explanation: 'Summary total only (-s) in human-readable units (-h)' },
        { token: '/var/log/*', role: 'path', explanation: 'Target directory contents to evaluate' },
        { token: '| sort -hr', role: 'operator', explanation: 'Pipe to sort numerically by human unit (-h) in reverse (-r)' },
        { token: '| head -n 10', role: 'argument', explanation: 'Display only the top 10 largest items' }
      ],
      variations: [
        { command: 'du -sh * | sort -hr | head -n 10', description: 'List the 10 largest directories in your current working location' },
        { command: 'du -h --max-depth=1 /var | sort -hr', description: 'Measure directory tree 1 level deep without glob expansion issues' },
        { command: 'ncdu /var/log', description: 'Launch interactive terminal curses-based disk usage browser (if installed)' }
      ],
      expectedOutput: '45G\t/var/log/journal\n12G\t/var/log/nginx\n2.4G\t/var/log/syslog\n850M\t/var/log/auth.log\n120M\t/var/log/dpkg.log',
      commonMistakes: [
        { mistake: 'Running "du -sh /" on a root filesystem with network NFS shares mounted', whyWrong: 'du will cross filesystems and walk entire petabyte network storage mounts, locking up the terminal for hours.', correctWay: 'Use "du -xh --max-depth=1 /" (-x stays on the one local filesystem only).' },
        { mistake: 'Deleting a 50GB active log file with "rm" while a daemon is writing to it', whyWrong: 'The daemon holds the open file handle; the space will NOT be freed until the daemon restarts.', correctWay: 'Zero out the log file safely without breaking file handles using "truncate -s 0 /path/to/log".' }
      ],
      safeRecovery: 'If du is taking too long on a large disk, press Ctrl+C and run "du -xh --max-depth=1 /path" to constrain the search.'
    }),

    buildLinuxConcept({
      id: 'c-14-13',
      subChapterNumber: '14.13',
      command: 'df -ih',
      title: 'Inode Exhaustion (df -i)',
      topicId: 'ch-14',
      topicNumber: '14',
      topicTitle: 'Storage & Filesystem Administration',
      subtitle: 'The ghost full disk: running out of file index slots while gigabytes of disk space remain free',
      badges: ['Inodes', 'df -i', 'Troubleshooting'],
      difficulty: 'Intermediate',
      quote: 'A disk can be 100% full even with 500 Gigabytes of free space left: when you run out of inodes, you cannot create a single new file.',
      whatIsIt: 'In Linux filesystems (like ext4), every file, directory, and symlink requires an Inode to store its metadata (ownership, permissions, timestamps, block pointers). Inodes are allocated when the filesystem is formatted. If a system generates millions of tiny files (such as PHP session files, mail queues, or cache tokens), the inode table can hit 100% utilization while raw gigabytes of disk space remain completely empty. Running "df -i" displays inode capacity instead of block capacity.',
      inSimpleWords: 'Think of a coat check room with 1,000 hanger tags. Even if the closet is huge and has plenty of empty space, once all 1,000 hanger tags are taken, you cannot check in another coat.',
      whyDoYouNeedIt: 'An application crashes with "No space left on device". You run "df -h" and see 80% free disk space. Only an experienced engineer knows to run "df -i" to discover 100% inode exhaustion.',
      realWorldScenario: 'An uncleaned PHP session directory in /var/lib/php/sessions accumulated 4 million 0-byte session files over 2 years. Applications stopped accepting logins with "No space left on device". Running "df -ih" showed / at 100% IUse.',
      realWorldAnalogy: 'Having an empty notebook with 200 blank pages, but running out of lines on the table of contents index page.',
      withoutVsWith: {
        without: {
          title: 'Perplexed by "No Space Left on Device"',
          items: ['df -h shows plenty of gigabytes free, leaving administrators completely stumped', 'Restarting servers and daemons without solving the underlying index exhaustion', 'Assuming hardware disk corruption has occurred'],
          outcome: 'Prolonged unexplained downtime and engineering confusion.'
        },
        with: {
          title: 'Diagnosing Inode Exhaustion with df -i',
          items: ['Immediate identification of 100% inode utilization using df -ih', 'Locating runaway directories containing millions of tiny files using find or perl', 'Automating cron cleanup to purge expired micro-files and sessions'],
          outcome: 'Instant diagnosis, root-cause resolution, and proactive prevention.'
        }
      },
      blockDiagram: {
        title: 'Blocks vs Inodes Capacity',
        subtitle: 'Two independent limits on Linux filesystems:',
        nodes: [
          { id: 'blocks', label: 'Data Blocks (df -h)', simpleDef: 'Volume of raw bytes', techDef: 'Storage payload capacity for actual file bytes', badge: 'Raw Space', color: '#38bdf8' },
          { id: 'inodes', label: 'Inodes (df -i)', simpleDef: 'Count of files allowed', techDef: 'Number of metadata records allocated at format time', badge: 'File Count', color: '#ef4444' },
          { id: 'result', label: 'Either Hits 100% = Crash', simpleDef: 'Both must have headroom', techDef: 'VFS returns ENOSPC if either data blocks or inode table fills up', badge: 'Outage', color: '#f59e0b' }
        ]
      },
      terms: [
        { term: 'Inode', simple: 'A record that holds all information about a file except its name and its actual data.', technical: 'Fixed-size data structure storing owner, group, mode, ctime/mtime, size, and extents/block pointers.' },
        { term: 'df -i', simple: 'Shows inode usage percentages instead of gigabytes.', technical: 'Queries statvfs f_files (total inodes) and f_ffree (free inodes).' }
      ],
      syntaxCode: 'df -ih',
      syntaxTokens: [
        { token: 'df', role: 'command', explanation: 'Report filesystem space usage' },
        { token: '-i', role: 'option', explanation: 'List inode usage information instead of block usage' },
        { token: 'h', role: 'option', explanation: 'Print values in human-readable format (e.g., 1K, 234M)' }
      ],
      variations: [
        { command: 'df -ih', description: 'Display inode usage for all mounted filesystems in human-readable format' },
        { command: 'df -i /var', description: 'Check inode percentage specifically on the filesystem hosting /var' },
        { command: 'find /var/spool -type d -exec sh -c \'echo -n "{}: "; ls -1 "{}" | wc -l\' \\;', description: 'Find which directory has the highest number of files' }
      ],
      expectedOutput: 'Filesystem     Inodes IUsed IFree IUse% Mounted on\n/dev/sda2        3.2M  3.2M     0  100% /\n/dev/sdb1        6.5M  150K  6.4M    3% /data\n/dev/sda1           0     0     0     - /boot/efi',
      commonMistakes: [
        { mistake: 'Trying to delete 2 million files with "rm *" and getting "Argument list too long"', whyWrong: 'The shell tries to expand 2 million names into command arguments, exceeding kernel ARG_MAX.', correctWay: 'Delete large file collections efficiently using "find /path -type f -delete".' },
        { mistake: 'Thinking you can increase inodes on an existing ext4 filesystem', whyWrong: 'On ext4, total inodes are locked at format time (mkfs.ext4 -N); they cannot be changed online.', correctWay: 'Clean up unnecessary micro-files, or choose XFS which allocates inodes dynamically as needed.' }
      ],
      safeRecovery: 'To immediately free inodes on a locked server, purge old session files or package cache: "sudo find /var/tmp -type f -atime +7 -delete".'
    }),

    buildLinuxConcept({
      id: 'c-14-14',
      subChapterNumber: '14.14',
      command: 'pvs && vgs && lvs',
      title: 'Logical Volume Manager (LVM) Architecture',
      topicId: 'ch-14',
      topicNumber: '14',
      topicTitle: 'Storage & Filesystem Administration',
      subtitle: 'Virtual storage abstraction: pooling physical disks and slicing dynamic logical volumes',
      badges: ['LVM', 'Architecture', 'Storage'],
      difficulty: 'Intermediate',
      quote: 'LVM frees you from physical disk boundaries: pool 5 separate hard drives together and slice them into dynamic, resizable volumes on the fly.',
      whatIsIt: 'Logical Volume Manager (LVM) is a storage virtualization subsystem in the Linux kernel (device-mapper). Traditional partitions are rigid and locked to a single physical disk. LVM introduces a 3-tier abstraction: 1) Physical Volumes (PVs) are raw disks or partitions initialized for LVM; 2) Volume Groups (VGs) pool one or more PVs into a single shared storage pool; 3) Logical Volumes (LVs) are virtual partitions carved out of the Volume Group that can be formatted and resized dynamically while online.',
      inSimpleWords: 'LVM turns your hard drives into digital Lego blocks. You pour all your disks into one big storage swimming pool, and then scoop out as much storage as you need for each folder. If you run out of room, you can make the scoop bigger anytime.',
      whyDoYouNeedIt: 'In enterprise production, storage requirements grow unpredictably. With traditional partitions, expanding a full drive requires downtime, repartitioning, and risk. With LVM, you plug in a new disk, add it to the Volume Group, and expand the volume in 5 seconds without rebooting or stopping running services.',
      realWorldScenario: 'Your MySQL database directory is running out of room. The server has an LVM logical volume on /var/lib/mysql. You run a single command "lvextend -r -L +50G /dev/vg0/mysql" to expand the volume and the filesystem online with zero downtime.',
      realWorldAnalogy: 'Pouring milk from three different small cartons into a large pitcher (Volume Group), and then pouring exact glassfuls (Logical Volumes) of any custom size you want.',
      withoutVsWith: {
        without: {
          title: 'Rigid Traditional Partitioning',
          items: ['Partitions locked to the physical size of a single drive', 'Expanding storage requires server downtime, unmounting, and repartitioning', 'No ability to create instantaneous read-only snapshot backups'],
          outcome: 'Storage inflexibility, scheduled downtime, and complex migrations.'
        },
        with: {
          title: 'Dynamic LVM Architecture',
          items: ['Pool multiple heterogeneous drives (NVMe + SSD + HDD) into a single VG', 'Resize volumes on-the-fly while active and mounted without downtime', 'Instantaneous copy-on-write snapshots for consistent database backups'],
          outcome: 'Zero-downtime storage expansion and complete enterprise agility.'
        }
      },
      blockDiagram: {
        title: 'LVM 3-Tier Architecture',
        subtitle: 'From physical drives to mounted filesystems:',
        nodes: [
          { id: 'pv', label: '1. Physical Volumes (PV)', simpleDef: 'Disks /dev/sdb, /dev/sdc', techDef: 'Raw block devices initialized with LVM metadata headers', badge: 'PV', color: '#38bdf8' },
          { id: 'vg', label: '2. Volume Group (VG)', simpleDef: 'Pooled storage pool', techDef: 'Aggregates PVs into unified pool of Physical Extents (PE, e.g. 4MB)', badge: 'VG', color: '#10b981' },
          { id: 'lv', label: '3. Logical Volume (LV)', simpleDef: 'Virtual partition (/dev/vg0/data)', techDef: 'Device-mapper target presenting linear or striped block device', badge: 'LV', color: '#a855f7' },
          { id: 'fs', label: '4. Filesystem & Mount', simpleDef: 'ext4 mounted on /data', techDef: 'Standard filesystem formatted on the logical volume', badge: 'Mount', color: '#f59e0b' }
        ]
      },
      terms: [
        { term: 'Physical Extent (PE)', simple: 'The smallest Lego brick chunk in LVM (usually 4 Megabytes).', technical: 'Smallest allocatable block of contiguous storage within a Volume Group.' },
        { term: 'device-mapper', simple: 'The Linux kernel framework that powers LVM, encryption (LUKS), and multipath.', technical: 'Kernel module providing block device mapping targets (linear, striped, snapshot, crypt).' }
      ],
      syntaxCode: 'pvs && vgs && lvs',
      syntaxTokens: [
        { token: 'pvs', role: 'command', explanation: 'Report information about physical volumes in concise tabular format' },
        { token: '&&', role: 'operator', explanation: 'Logical AND operator: execute next command if previous succeeded' },
        { token: 'vgs', role: 'command', explanation: 'Report information about volume groups' },
        { token: 'lvs', role: 'command', explanation: 'Report information about logical volumes' }
      ],
      variations: [
        { command: 'sudo pvs', description: 'Display summary table of all Physical Volumes' },
        { command: 'sudo vgs', description: 'Display Volume Groups, total sizes, and free unallocated capacity' },
        { command: 'sudo lvs', description: 'Display Logical Volumes, their parent VG, and volume sizes' }
      ],
      expectedOutput: '  PV         VG        Fmt  Attr PSize   PFree \n  /dev/sda3  ubuntu-vg lvm2 a--  465.3G  100.0G\n  VG        #PV #LV #SN Attr   VSize   VFree \n  ubuntu-vg   1   2   0 wz--n- 465.3G  100.0G\n  LV        VG        Attr       LSize   Pool Origin Data%  Meta%  Move Log Cpy%Sync Convert\n  ubuntu-lv ubuntu-vg -wi-ao---- 365.3G',
      commonMistakes: [
        { mistake: 'Trying to format or mount a Volume Group directly', whyWrong: 'A Volume Group is a storage pool, not a block device; only Logical Volumes can be formatted and mounted.', correctWay: 'Create a Logical Volume (lvcreate) inside the VG, then format and mount the LV.' },
        { mistake: 'Confusing Physical Volumes with physical hardware disks', whyWrong: 'A PV can be an entire disk (/dev/sdb), a partition (/dev/sdb1), or even a hardware RAID LUN.', correctWay: 'Initialize block devices as PVs using "pvcreate" before adding to a VG.' }
      ],
      safeRecovery: 'To inspect complete detailed LVM configuration metadata, run "sudo pvdisplay", "sudo vgdisplay", or "sudo lvdisplay".'
    }),

    buildLinuxConcept({
      id: 'c-14-15',
      subChapterNumber: '14.15',
      command: 'sudo pvdisplay',
      title: 'Physical Volumes (pvcreate, pvs, pvdisplay)',
      topicId: 'ch-14',
      topicNumber: '14',
      topicTitle: 'Storage & Filesystem Administration',
      subtitle: 'Initializing block devices for LVM: metadata labels, UUIDs, and PE mapping',
      badges: ['LVM', 'PV', 'Storage'],
      difficulty: 'Intermediate',
      quote: 'pvcreate marks a disk as an LVM participant: writing an LVM label at sector 1 and establishing physical extent boundaries.',
      whatIsIt: 'A Physical Volume (PV) is the foundation of LVM. You create a PV using "pvcreate" on an unmounted disk or partition (e.g. pvcreate /dev/sdb). This operation writes an LVM label and metadata area near the start of the drive, assigns a unique PV UUID, and divides the storage space into Physical Extents (PEs). "pvs" displays a concise summary of PVs, while "pvdisplay" provides deep telemetry on total extents, allocated extents, and PE size.',
      inSimpleWords: 'Preparing a blank drive so LVM can use it. It stamps an official LVM membership card onto the drive so the system knows it belongs to the storage pool.',
      whyDoYouNeedIt: 'Before a new hard drive or EBS volume can contribute storage to an existing LVM group, it must be initialized as a Physical Volume.',
      realWorldScenario: 'You attach a new 500GB SSD (/dev/sdc) to a hypervisor. You initialize it for LVM by running "sudo pvcreate /dev/sdc", making it immediately available to be absorbed into a volume group.',
      realWorldAnalogy: 'Registering a new delivery truck into a logistics fleet so dispatchers know its cargo capacity.',
      withoutVsWith: {
        without: {
          title: 'Uninitialized Block Device',
          items: ['LVM cannot recognize the drive as storage pool capacity', 'Volume groups cannot absorb or allocate space from the disk', 'Attempting to run vgextend fails with "device not found or not a PV"'],
          outcome: 'Inability to expand LVM storage pools.'
        },
        with: {
          title: 'Initialized Physical Volume',
          items: ['Self-identifying LVM metadata header recognized across server reboots', 'Seamless absorption into Volume Groups with "vgcreate" or "vgextend"', 'Detailed extent tracking and hardware UUID identification'],
          outcome: 'Ready-to-pool storage bricks for dynamic volume management.'
        }
      },
      blockDiagram: {
        title: 'PV Internal Layout',
        subtitle: 'What pvcreate writes to the raw disk:',
        nodes: [
          { id: 'label', label: 'LVM Label (Sector 1)', simpleDef: 'PV ID card', techDef: '512-byte header with PV UUID and metadata area offset', badge: 'Header', color: '#38bdf8' },
          { id: 'meta', label: 'LVM Metadata Area', simpleDef: 'VG backup records', techDef: 'Circular text ring buffer storing complete VG configuration history', badge: 'Metadata', color: '#a855f7' },
          { id: 'pe', label: 'Data Area (Physical Extents)', simpleDef: 'Grid of 4MB blocks', techDef: 'Array of Physical Extents (PE 0, PE 1...) allocated to LVs', badge: 'Extents', color: '#10b981' }
        ]
      },
      terms: [
        { term: 'pvcreate', simple: 'Initializes a disk or partition so LVM can use it for storage.', technical: 'Writes LVM2 label and metadata ring-buffer at the beginning of the block device.' },
        { term: 'pvs', simple: 'A fast one-line summary command showing all physical volumes.', technical: 'Queries liblvm/sysfs to print tabular PV name, VG membership, format, and free space.' }
      ],
      syntaxCode: 'sudo pvdisplay',
      syntaxTokens: [
        { token: 'sudo', role: 'command', explanation: 'Execute with administrative root privileges' },
        { token: 'pvdisplay', role: 'command', explanation: 'Display detailed attributes of LVM physical volumes' }
      ],
      variations: [
        { command: 'sudo pvcreate /dev/sdb', description: 'Initialize /dev/sdb as an LVM Physical Volume' },
        { command: 'sudo pvs', description: 'Display concise tabular overview of all Physical Volumes' },
        { command: 'sudo pvdisplay /dev/sda3', description: 'Show verbose metadata, total extents, and PE size of /dev/sda3' }
      ],
      expectedOutput: '  --- Physical volume ---\n  PV Name               /dev/sda3\n  VG Name               ubuntu-vg\n  PV Size               <465.26 GiB / not usable 3.00 MiB\n  Allocatable           yes \n  PE Size               4.00 MiB\n  Total PE              119106\n  Free PE               25600\n  Allocated PE          93506\n  PV UUID               1a2b3c-4d5e-6f7a-8b9c-0d1e2f3a4b5c',
      commonMistakes: [
        { mistake: 'Running pvcreate on a disk that contains an active filesystem without checking', whyWrong: 'pvcreate will overwrite the partition table or filesystem superblock, destroying existing data.', correctWay: 'Always inspect the device with "lsblk -f" first to verify it has no active filesystem.' },
        { mistake: 'Partitioning a disk with type "83" (Linux) instead of "8e" (Linux LVM)', whyWrong: 'While LVM can use any partition, marking it "8e" (or "Linux LVM" in GPT) signals administrative intent.', correctWay: 'Set partition type to Linux LVM in fdisk before running pvcreate.' }
      ],
      safeRecovery: 'If you ran pvcreate on the wrong empty disk, remove the LVM header cleanly using "sudo pvremove /dev/sdb".'
    }),

    buildLinuxConcept({
      id: 'c-14-16',
      subChapterNumber: '14.16',
      command: 'sudo vgdisplay',
      title: 'Volume Groups (vgcreate, vgs, vgextend)',
      topicId: 'ch-14',
      topicNumber: '14',
      topicTitle: 'Storage & Filesystem Administration',
      subtitle: 'Aggregating storage pools: combining multiple drives into a single elastic reservoir',
      badges: ['LVM', 'VG', 'Pool'],
      difficulty: 'Intermediate',
      quote: 'A Volume Group is the reservoir: combine a 1TB SSD and a 2TB NVMe into a single 3TB pool of storage.',
      whatIsIt: 'A Volume Group (VG) aggregates one or more Physical Volumes into a single unified storage pool. Created using "vgcreate <vg_name> <pv_path>...", the Volume Group standardizes all storage into uniform Physical Extents (PEs, typically 4MB). As storage needs grow, the VG can be expanded dynamically using "vgextend <vg_name> <new_pv>" without disrupting active logical volumes. "vgs" shows total pool capacity and free allocatable space.',
      inSimpleWords: 'The giant storage pool. If you have two 500GB drives, the Volume Group combines them into a single 1,000GB pool. You can add more drives to the pool anytime you want.',
      whyDoYouNeedIt: 'Single hard drives have finite limits. Volume Groups allow you to present a single 50TB storage space to applications by grouping multiple smaller physical disks together.',
      realWorldScenario: 'Your Volume Group "vg_production" is down to only 10GB of free space. You slide a new 2TB NVMe drive into the server, run "pvcreate /dev/sdd", and run "sudo vgextend vg_production /dev/sdd". The pool immediately gains 2TB of free space.',
      realWorldAnalogy: 'Connecting two water tanks with a pipe so they act as a single large water reservoir.',
      withoutVsWith: {
        without: {
          title: 'Managing Disks in Silos',
          items: ['Disk A is 100% full while Disk B sits 90% empty with no way to share space', 'Applications bound to individual hard drive hardware capacity limits', 'Complex data migrations required to swap out smaller drives for larger ones'],
          outcome: 'Storage fragmentation, wasted capacity, and painful manual migrations.'
        },
        with: {
          title: 'Unified Storage with Volume Groups',
          items: ['Pool disparate physical drives into a single elastic storage reservoir', 'Zero-downtime pool expansion using "vgextend" with new drives', 'Effortless hardware migration: pvmove data between drives without stopping services'],
          outcome: 'Maximized disk utilization and seamless online capacity expansion.'
        }
      },
      blockDiagram: {
        title: 'Volume Group Pooling',
        subtitle: 'Combining multiple PVs into a unified VG pool:',
        nodes: [
          { id: 'pv1', label: 'PV /dev/sdb (500GB)', simpleDef: 'First physical drive', techDef: 'Physical Volume contributing 125,000 PEs', badge: 'PV 1', color: '#38bdf8' },
          { id: 'pv2', label: 'PV /dev/sdc (500GB)', simpleDef: 'Second physical drive', techDef: 'Physical Volume contributing 125,000 PEs', badge: 'PV 2', color: '#38bdf8' },
          { id: 'vg', label: 'Volume Group "vg_data" (1TB)', simpleDef: 'Unified 1,000GB pool', techDef: 'Unified pool of 250,000 PEs ready for LV allocation', badge: 'VG Pool', color: '#10b981' }
        ]
      },
      terms: [
        { term: 'vgcreate', simple: 'Creates a new Volume Group out of one or more physical volumes.', technical: 'Initializes VG descriptor area and assigns unified metadata identifier.' },
        { term: 'vgextend', simple: 'Adds an extra physical hard drive to an existing storage pool.', technical: 'Appends new PV physical extents to the Volume Group allocation map.' }
      ],
      syntaxCode: 'sudo vgdisplay',
      syntaxTokens: [
        { token: 'sudo', role: 'command', explanation: 'Execute with root administrative privileges' },
        { token: 'vgdisplay', role: 'command', explanation: 'Display detailed attributes of LVM volume groups' }
      ],
      variations: [
        { command: 'sudo vgcreate vg_data /dev/sdb1', description: 'Create a new Volume Group named "vg_data" from /dev/sdb1' },
        { command: 'sudo vgextend vg_data /dev/sdc1', description: 'Add /dev/sdc1 to existing Volume Group "vg_data"' },
        { command: 'sudo vgs', description: 'Display concise summary table of all Volume Groups' },
        { command: 'sudo vgdisplay vg_data', description: 'Show detailed extent size, capacity, and status of vg_data' }
      ],
      expectedOutput: '  --- Volume group ---\n  VG Name               ubuntu-vg\n  System ID             \n  Format                lvm2\n  Metadata Areas        1\n  VG Access             read/write\n  VG Status             resizable\n  MAX LV                0\n  Cur LV                2\n  Open LV               2\n  Max PV                0\n  Cur PV                1\n  Act PV                1\n  VG Size               <465.26 GiB\n  PE Size               4.00 MiB\n  Total PE              119106\n  Alloc PE / Size       93506 / 365.26 GiB\n  Free  PE / Size       25600 / 100.00 GiB',
      commonMistakes: [
        { mistake: 'Creating a Volume Group with non-standard Physical Extent sizes without necessity', whyWrong: 'Default 4MB PE size supports volumes up to 16 Exabytes; changing it complicates extent math.', correctWay: 'Stick to the standard 4MiB default PE size unless building specialized arrays.' },
        { mistake: 'Removing a physical drive from a VG without running pvmove first', whyWrong: 'If active logical volumes store data on that PV, removing it will corrupt filesystems.', correctWay: 'Always evacuate data from the PV with "sudo pvmove /dev/sdX" before running "vgreduce".' }
      ],
      safeRecovery: 'To see how much free unallocated space remains in a Volume Group, check the "VFree" column in "sudo vgs".'
    }),

    buildLinuxConcept({
      id: 'c-14-17',
      subChapterNumber: '14.17',
      command: 'sudo lvdisplay',
      title: 'Logical Volumes (lvcreate, lvs, lvextend)',
      topicId: 'ch-14',
      topicNumber: '14',
      topicTitle: 'Storage & Filesystem Administration',
      subtitle: 'Carving virtual partitions: creating, sizing, naming, and inspecting block devices',
      badges: ['LVM', 'LV', 'Storage'],
      difficulty: 'Intermediate',
      quote: 'A Logical Volume is the virtual partition that your operating system formats and mounts. Size it as needed, grow it anytime.',
      whatIsIt: 'A Logical Volume (LV) is the usable virtual block device carved out of a Volume Group. Created with "lvcreate -L <size> -n <name> <vg_name>", the kernel device-mapper exposes the LV as /dev/<vg_name>/<lv_name> and /dev/mapper/<vg_name>-<lv_name>. These devices behave exactly like physical partitions: you format them with mkfs, mount them to directories, and assign UUIDs. "lvs" lists all LVs with their sizes and attributes.',
      inSimpleWords: 'A virtual partition. You carve it out of the storage pool and give it a name like "lv_database". Once created, you format it and use it just like a regular hard drive.',
      whyDoYouNeedIt: 'Instead of dedicating entire physical disks to specific directories, LVs allow you to create appropriately sized partitions (/var, /home, /opt) that can be resized dynamically as workloads evolve.',
      realWorldScenario: 'You are deploying an ElasticSearch cluster. You carve a 200GB volume from the storage pool using "sudo lvcreate -L 200G -n lv_es vg_data", format it with XFS, and mount it to /var/lib/elasticsearch.',
      realWorldAnalogy: 'Scooping a bowl of cereal out of a giant family-sized cereal box whenever you are hungry.',
      withoutVsWith: {
        without: {
          title: 'Rigid Disk Partitions',
          items: ['Hard-coded partition boundaries that cannot cross multiple physical disks', 'Resizing requires rebooting into a LiveCD to edit partition boundaries', 'No ability to take instantaneous read-only snapshots for backups'],
          outcome: 'Frequent maintenance windows and storage inflexibility.'
        },
        with: {
          title: 'Elastic Logical Volumes',
          items: ['Virtual block devices carved precisely to required size (+10G, +50G)', 'Instantaneous online expansion while filesystems remain mounted and active', 'Direct integration into systemd mountpoints and enterprise backup workflows'],
          outcome: 'Dynamic, modern, and agile enterprise storage management.'
        }
      },
      blockDiagram: {
        title: 'Carving Logical Volumes',
        subtitle: 'Slicing volumes from a shared Volume Group:',
        nodes: [
          { id: 'vg', label: 'Volume Group (vg_data: 500GB)', simpleDef: 'Storage pool', techDef: 'Volume group managing 125,000 Physical Extents', badge: 'VG Pool', color: '#10b981' },
          { id: 'lv_root', label: 'LV "root" (100GB)', simpleDef: 'Root OS partition', techDef: 'Allocated 25,000 PEs -> /dev/vg_data/root mounted on /', badge: 'LV 1', color: '#38bdf8' },
          { id: 'lv_db', label: 'LV "mysql" (250GB)', simpleDef: 'Database partition', techDef: 'Allocated 62,500 PEs -> /dev/vg_data/mysql mounted on /var/lib/mysql', badge: 'LV 2', color: '#a855f7' },
          { id: 'free', label: 'Free Space (150GB)', simpleDef: 'Unallocated reserve', techDef: '37,500 PEs kept in reserve for future online expansion', badge: 'Reserve', color: '#f59e0b' }
        ]
      },
      terms: [
        { term: 'lvcreate', simple: 'Command used to create a new logical volume from a volume group.', technical: 'Allocates physical extents from VG and creates device-mapper virtual block device node.' },
        { term: '/dev/mapper/', simple: 'Directory where the kernel device-mapper creates canonical symlinks to logical volumes.', technical: 'Filesystem path presenting standardized <vg>-<lv> device-mapper block devices.' }
      ],
      syntaxCode: 'sudo lvdisplay',
      syntaxTokens: [
        { token: 'sudo', role: 'command', explanation: 'Execute with administrative root privileges' },
        { token: 'lvdisplay', role: 'command', explanation: 'Display detailed attributes of LVM logical volumes' }
      ],
      variations: [
        { command: 'sudo lvcreate -L 50G -n lv_data vg_data', description: 'Create a 50GB logical volume named "lv_data" inside "vg_data"' },
        { command: 'sudo lvcreate -l 100%FREE -n lv_backup vg_data', description: 'Create a volume consuming 100% of all remaining free space in the VG' },
        { command: 'sudo lvs', description: 'Display concise summary table of all Logical Volumes' }
      ],
      expectedOutput: '  --- Logical volume ---\n  LV Path                /dev/ubuntu-vg/ubuntu-lv\n  LV Name                ubuntu-lv\n  VG Name                ubuntu-vg\n  LV UUID                9z8y7x-6w5v-4u3t-2s1r-0q1p2o3n4m5l\n  LV Write Access        read/write\n  LV Creation host, time ubuntu-server, 2026-09-30 00:00:00 UTC\n  LV Status              available\n  # open                 1\n  LV Size                365.26 GiB\n  Current LE             93506\n  Segments               1\n  Allocation             inherit\n  Read ahead sectors     auto\n  - currently set to     256\n  Block device           253:0',
      commonMistakes: [
        { mistake: 'Allocating 100% of Volume Group space immediately on day one', whyWrong: 'Consuming all VG space leaves zero room for online expansion, snapshots, or emergency storage.', correctWay: 'Keep 20-30% of VG capacity free as an unallocated reserve buffer.' },
        { mistake: 'Using lowercase "-l" instead of uppercase "-L" for gigabyte sizes', whyWrong: 'Lowercase "-l" expects extent counts (LEs); uppercase "-L" expects human sizes (e.g. 50G).', correctWay: 'Use "-L 50G" for gigabytes, or "-l 100%FREE" for percentages.' }
      ],
      safeRecovery: 'If you create a logical volume with an incorrect name or size, delete it cleanly with "sudo lvremove /dev/vg_name/lv_name".'
    }),

    buildLinuxConcept({
      id: 'c-14-18',
      subChapterNumber: '14.18',
      command: 'sudo lvextend -r -L +10G /dev/vg0/data',
      title: 'Expanding and Shrinking Storage on the Fly',
      topicId: 'ch-14',
      topicNumber: '14',
      topicTitle: 'Storage & Filesystem Administration',
      subtitle: 'Online storage growth: the magic of the "-r" flag to expand LV and filesystem in one command',
      badges: ['lvextend', 'Online Growth', 'Zero Downtime'],
      difficulty: 'Intermediate',
      quote: 'The -r flag is the senior engineer\'s secret: it resizes the logical volume AND the underlying filesystem in a single atomic step.',
      whatIsIt: 'Expanding an LVM storage volume requires two distinct steps: 1) Growing the underlying Logical Volume block device, and 2) Expanding the filesystem (ext4 or XFS) to claim the new blocks. Historically, admins had to run "lvextend" followed by "resize2fs" (for ext4) or "xfs_growfs" (for XFS). Modern LVM provides the "-r" (--resizefs) flag, which automatically detects the filesystem type and resizes both the LV and the filesystem safely in a single command with zero downtime.',
      inSimpleWords: 'Making a drive bigger without turning off your computer. You add 10 Gigabytes, and both the virtual drive and the filesystem expand instantly while your websites and databases keep running.',
      whyDoYouNeedIt: 'Production servers cannot be taken offline every time a database needs more disk space. Online filesystem expansion is a mandatory core competency for site reliability engineers.',
      realWorldScenario: 'An alert warns that the database volume /dev/vg_data/lv_mysql is at 92% capacity during Black Friday traffic. You run "sudo lvextend -r -L +50G /dev/vg_data/lv_mysql". The database never skips a beat and immediately has 50GB of breathing room.',
      realWorldAnalogy: 'Expanding a balloon: blowing more air into the balloon (LV) automatically stretches the rubber skin (filesystem) to match the new size.',
      withoutVsWith: {
        without: {
          title: 'Manual Two-Step Resize',
          items: ['Running lvextend and forgetting to resize the filesystem, wondering why df shows no new space', 'Accidentally typing wrong sector numbers causing filesystem corruption', 'Taking servers offline for scheduled maintenance windows to resize partitions'],
          outcome: 'Operational confusion, unexpanded filesystems, and unnecessary downtime.'
        },
        with: {
          title: 'Atomic Resize with lvextend -r',
          items: ['Single command resizes both block device and filesystem simultaneously', 'Automatic detection of ext4 (resize2fs) or XFS (xfs_growfs)', '100% online operation: zero service restarts, zero dropped database queries'],
          outcome: 'Effortless zero-downtime storage elasticity.'
        }
      },
      blockDiagram: {
        title: 'Online Storage Expansion Flow',
        subtitle: 'What happens when you run "lvextend -r -L +10G":',
        nodes: [
          { id: 'step1', label: '1. Check VG Free Extents', simpleDef: 'Verifies pool has 10GB', techDef: 'Confirms Volume Group has at least 2,560 free PEs', badge: 'Preflight', color: '#38bdf8' },
          { id: 'step2', label: '2. Extend Logical Volume', simpleDef: 'Grows block device', techDef: 'Kernel device-mapper extends logical extents boundary', badge: 'Device-Mapper', color: '#10b981' },
          { id: 'step3', label: '3. Resize Filesystem (-r)', simpleDef: 'Grows filesystem online', techDef: 'Executes resize2fs or xfs_growfs to claim new blocks into superblock', badge: 'Filesystem', color: '#a855f7' }
        ]
      },
      terms: [
        { term: 'lvextend -r', simple: 'Extends a logical volume AND automatically resizes the filesystem in one command.', technical: '--resizefs: automatically calls resize2fs, xfs_growfs, or fsadm to match filesystem to LV.' },
        { term: 'Online Expansion', simple: 'Growing storage while the filesystem is actively mounted and in use.', technical: 'Kernel VFS dynamically appends block groups without unmounting or blocking I/O.' }
      ],
      syntaxCode: 'sudo lvextend -r -L +10G /dev/vg0/data',
      syntaxTokens: [
        { token: 'sudo', role: 'command', explanation: 'Execute with administrative root privileges' },
        { token: 'lvextend', role: 'command', explanation: 'Extend the size of a logical volume' },
        { token: '-r', role: 'option', explanation: '--resizefs: automatically resize underlying filesystem to match new LV size' },
        { token: '-L +10G', role: 'argument', explanation: 'Increase volume size by 10 Gigabytes' },
        { token: '/dev/vg0/data', role: 'path', explanation: 'Target logical volume path' }
      ],
      variations: [
        { command: 'sudo lvextend -r -L +10G /dev/vg0/data', description: 'Add 10GB to logical volume and expand filesystem online' },
        { command: 'sudo lvextend -r -l +100%FREE /dev/vg0/data', description: 'Expand volume to consume all remaining free space in the Volume Group' },
        { command: 'sudo resize2fs /dev/vg0/data', description: 'Manually expand ext4 filesystem if "-r" flag was omitted' },
        { command: 'sudo xfs_growfs /mnt/data', description: 'Manually expand XFS filesystem (requires mountpoint path, not device)' }
      ],
      expectedOutput: '  Size of logical volume vg0/data changed from 20.00 GiB to 30.00 GiB (7680 extents).\n  Logical volume vg0/data successfully resized.\nresize2fs 1.46.5 (30-Dec-2021)\nFilesystem at /dev/mapper/vg0-data is mounted on /data; on-line resizing required\nold_desc_blocks = 3, new_desc_blocks = 4\nThe filesystem on /dev/mapper/vg0-data is now 7864320 (4k) blocks long.',
      commonMistakes: [
        { mistake: 'Forgetting the "+" sign in "-L +10G"', whyWrong: '"-L 10G" sets the absolute size to 10GB (which might shrink it!), whereas "-L +10G" adds 10GB to existing size.', correctWay: 'Always include the "+" sign when you want to add capacity.' },
        { mistake: 'Attempting to shrink an XFS logical volume', whyWrong: 'XFS does NOT support shrinking; attempting to shrink will destroy the filesystem.', correctWay: 'Never shrink an XFS volume; only ext4 can be shrunk (and only offline while unmounted).' }
      ],
      safeRecovery: 'If you forgot the "-r" flag, simply run "sudo resize2fs /dev/vg0/data" (ext4) or "sudo xfs_growfs /mountpoint" (XFS).'
    }),

    buildLinuxConcept({
      id: 'c-14-19',
      subChapterNumber: '14.19',
      command: 'swapon --show',
      title: 'Swap Space Management (mkswap, swapon, swapoff)',
      topicId: 'ch-14',
      topicNumber: '14',
      topicTitle: 'Storage & Filesystem Administration',
      subtitle: 'Virtual memory safety net: swap partitions vs swap files, vm.swappiness, and OOM prevention',
      badges: ['Swap', 'Memory', 'Performance'],
      difficulty: 'Intermediate',
      quote: 'Swap is not slow RAM: it is the kernel\'s pressure release valve, evicting inactive memory pages to keep active processes alive.',
      whatIsIt: 'Swap space is dedicated storage on a disk or SSD used by the Linux virtual memory manager. When physical RAM approaches capacity, the kernel pages out inactive memory (anonymous pages belonging to idle background processes) to swap, freeing high-speed RAM for active processes and disk caching. Swap can be created as a dedicated partition (/dev/sda3) or as a dynamic Swap File (/swapfile). "swapon" activates swap space; "swapoff" deactivates it; and "vm.swappiness" controls how aggressively the kernel offloads pages.',
      inSimpleWords: 'An overflow tank for your computer\'s RAM. When your memory fills up, Linux moves rarely-used background programs onto the hard drive so your active apps don\'t crash from running out of memory.',
      whyDoYouNeedIt: 'Without swap, a sudden memory spike will cause the Linux kernel Out-Of-Memory (OOM) Killer to abruptly kill your database or web server. Swap provides a safety buffer that prevents instant kernel panic crashes.',
      realWorldScenario: 'You are spinning up a 2GB RAM cloud VPS to run a build pipeline. Compiling code temporarily requires 3GB of memory. By configuring a 2GB swap file at /swapfile, the build succeeds without triggering the OOM killer.',
      realWorldAnalogy: 'A storage closet in the basement: you don\'t keep winter coats on your living room couch all summer; you store them in the basement until winter.',
      withoutVsWith: {
        without: {
          title: 'Zero Swap Configured',
          items: ['Instant OOM-Killer invocation terminating active database or web server processes', 'Kernel unable to evict inactive pages to enlarge file cache buffers', 'Zero safety headroom during sudden memory spikes'],
          outcome: 'Abrupt service terminations and system instability.'
        },
        with: {
          title: 'Properly Configured Swap Space',
          items: ['Graceful degradation under heavy memory pressure instead of hard crashes', 'Inactive daemon pages paged out to disk, freeing physical RAM for disk caching', 'Tunable kernel memory bias using vm.swappiness (e.g. set to 10 for databases)'],
          outcome: 'Rock-solid system stability and resilience against memory exhaustion.'
        }
      },
      blockDiagram: {
        title: 'Creating a Dynamic Swap File',
        subtitle: 'The 5 standard steps to create a 2GB swap file:',
        nodes: [
          { id: 'falloc', label: '1. fallocate -l 2G /swapfile', simpleDef: 'Allocate blank file', techDef: 'Preallocates contiguous 2GB file on disk', badge: 'Allocate', color: '#38bdf8' },
          { id: 'perm', label: '2. chmod 600 /swapfile', simpleDef: 'Lock down permissions', techDef: 'Restricts access exclusively to root (critical security!)', badge: 'Security', color: '#ef4444' },
          { id: 'mkswap', label: '3. mkswap /swapfile', simpleDef: 'Format as swap area', techDef: 'Writes swap signature and page slot header', badge: 'Format', color: '#10b981' },
          { id: 'swapon', label: '4. swapon /swapfile', simpleDef: 'Activate swap', techDef: 'Registers swapfile with kernel memory manager', badge: 'Activate', color: '#a855f7' },
          { id: 'fstab', label: '5. /etc/fstab entry', simpleDef: 'Make persistent on boot', techDef: '/swapfile none swap sw 0 0 in /etc/fstab', badge: 'Persist', color: '#f59e0b' }
        ]
      },
      terms: [
        { term: 'swappiness', simple: 'A setting from 0 to 100 that tells Linux how eagerly to use swap (default is 60).', technical: 'Kernel sysctl vm.swappiness controlling ratio of page cache reclaim vs anonymous swap paging.' },
        { term: 'OOM Killer (Out Of Memory)', simple: 'The kernel mechanism that sacrifices processes when physical RAM and swap are exhausted.', technical: 'Invokes mm/oom_kill.c calculating badness score to terminate processes and free memory pages.' }
      ],
      syntaxCode: 'swapon --show',
      syntaxTokens: [
        { token: 'swapon', role: 'command', explanation: 'Enable devices and files for paging and swapping' },
        { token: '--show', role: 'option', explanation: 'Display a summary table of all active swap devices, types, sizes, and priority' }
      ],
      variations: [
        { command: 'swapon --show', description: 'List active swap devices, files, sizes, and utilization' },
        { command: 'sudo swapon -a', description: 'Enable all swap areas specified in /etc/fstab' },
        { command: 'sudo swapoff -a', description: 'Disable all swap (flushes all swapped pages back into RAM)' },
        { command: 'sysctl vm.swappiness=10', description: 'Tune kernel to only swap when physical RAM is nearly exhausted' }
      ],
      expectedOutput: 'NAME      TYPE      SIZE USED PRIO\n/swapfile file        2G 256M   -2\n/dev/sda3 partition   4G   0B   -3',
      commonMistakes: [
        { mistake: 'Leaving swapfile permissions open (e.g. 644) instead of 600', whyWrong: 'Any unprivileged local user could read raw RAM contents (including passwords and SSL keys) dumped to swap.', correctWay: 'Always execute "sudo chmod 600 /swapfile".' },
        { mistake: 'Running "swapoff -a" when physical RAM is completely full', whyWrong: 'Disabling swap forces all swapped data back into RAM; if RAM cannot hold it, the OOM killer will panic.', correctWay: 'Check "free -m" to verify available RAM before running swapoff.' }
      ],
      safeRecovery: 'If swap thrashing causes severe system lag, check memory usage with "free -m" and tune "sudo sysctl vm.swappiness=10".'
    })
  ]
};
